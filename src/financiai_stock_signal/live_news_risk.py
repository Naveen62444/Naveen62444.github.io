"""Explainable live-news risk alerts for FinanciAI.

The module does not claim that a stock will crash or rise. It turns an article
into an event-risk assessment that can be combined with quote confirmation and
historical validation.
"""
from __future__ import annotations
from dataclasses import dataclass, asdict
import math,re
from typing import Iterable

NEGATIVE_EVENTS={
    "bankruptcy":(10,"solvency"),"insolvency":(10,"solvency"),"default":(9,"solvency"),
    "fraud":(9,"legal"),"criminal investigation":(9,"legal"),"sec investigation":(8,"legal"),
    "recall":(8,"product"),"fatal":(9,"safety"),"death":(9,"safety"),"grounding":(8,"safety"),
    "data breach":(8,"cyber"),"ransomware":(9,"cyber"),"global outage":(9,"operations"),
    "removed from":(8,"distribution"),"refund":(7,"product"),"boycott":(7,"reputation"),
    "delay":(6,"product"),"cuts forecast":(8,"guidance"),"profit warning":(9,"guidance"),
    "misses estimates":(7,"earnings"),"layoffs":(5,"employment"),"tariff":(6,"macro"),
}
POSITIVE_EVENTS={
    "raises forecast":(8,"guidance"),"raises guidance":(8,"guidance"),"beats estimates":(7,"earnings"),
    "record revenue":(8,"earnings"),"record profit":(8,"earnings"),"approval":(8,"regulatory"),
    "fda approval":(9,"regulatory"),"breakthrough":(7,"product"),"contract win":(7,"commercial"),
    "partnership":(5,"commercial"),"acquisition offer":(8,"corporate"),"buyback":(6,"capital"),
    "dividend increase":(6,"capital"),"strong demand":(6,"demand"),"record subscribers":(8,"demand"),
}
HEDGE_WORDS={"may","could","reportedly","considering","rumor","rumour","possible","sources say"}
HIGH_CREDIBILITY={"reuters","associated press","sec","fda","company filing","investor relations"}

@dataclass(frozen=True)
class NewsRiskAlert:
    symbol:str;headline:str;direction:str;seriousness:int;confidence:float
    event_types:tuple[str,...];matched_keywords:tuple[str,...];reason:str
    quote_change_pct:float|None=None
    def to_dict(self):return asdict(self)


def _matches(text:str,rules:dict[str,tuple[int,str]]):
    found=[]
    for phrase,(weight,kind) in rules.items():
        if re.search(r"\b"+re.escape(phrase)+r"\b",text):found.append((phrase,weight,kind))
    return found


def assess_article(symbol:str,headline:str,summary:str="",source:str="",quote_change_pct:float|None=None,
                   sentiment_score:float|None=None,relevance:float=1.0)->NewsRiskAlert:
    text=f"{headline} {summary}".lower();neg=_matches(text,NEGATIVE_EVENTS);pos=_matches(text,POSITIVE_EVENTS)
    neg_score=sum(x[1] for x in neg);pos_score=sum(x[1] for x in pos)
    if sentiment_score is not None:
        if sentiment_score<-.25:neg_score += min(4,abs(sentiment_score)*4)
        elif sentiment_score>.25:pos_score += min(4,sentiment_score*4)
    raw=pos_score-neg_score
    direction="upside event" if raw>=3 else "downside event" if raw<=-3 else "mixed / unclear"
    seriousness=min(10,max(1,round(max(pos_score,neg_score)*max(.35,min(relevance,1.0)))))
    hedge=sum(1 for w in HEDGE_WORDS if w in text);cred=1 if any(x in source.lower() for x in HIGH_CREDIBILITY) else 0
    confidence=max(.2,min(.95,.45 + .08*len(pos+neg)+.1*cred-.08*hedge))
    # Quote movement confirms contemporaneous reaction; it never converts association into causation.
    if quote_change_pct is not None:
        if direction=="upside event" and quote_change_pct>1:confidence=min(.98,confidence+.08)
        if direction=="downside event" and quote_change_pct<-1:confidence=min(.98,confidence+.08)
        if (direction=="upside event" and quote_change_pct<0) or (direction=="downside event" and quote_change_pct>0):
            confidence=max(.2,confidence-.12)
    matches=pos+neg;types=tuple(sorted({x[2] for x in matches}));keywords=tuple(x[0] for x in matches)
    if not matches:reason="No high-impact keyword rule matched. Treat the article as unclassified until NLP/entity checks are available."
    else:reason=f"Matched {', '.join(keywords)}; classified across {', '.join(types)}. This is an event-risk signal, not a price guarantee."
    return NewsRiskAlert(symbol,headline,direction,seriousness,round(confidence,2),types,keywords,reason,quote_change_pct)


def prioritise(alerts:Iterable[NewsRiskAlert])->list[NewsRiskAlert]:
    return sorted(alerts,key=lambda a:(a.seriousness,a.confidence),reverse=True)
