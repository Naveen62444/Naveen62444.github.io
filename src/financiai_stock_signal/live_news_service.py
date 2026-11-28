"""Connect provider news/quotes to the explainable alert engine."""
from __future__ import annotations
from .live_news_risk import assess_article,prioritise


def analyse_company_news(provider,symbol:str,days:int=2,limit:int=25,sentiment_model=None):
    quote=provider.quote(symbol);items=provider.company_news(symbol,days)[:limit]
    scored={}
    if sentiment_model is not None and items:
        frame=sentiment_model.score(items)
        scored={row.title:float(row.sentiment) for row in frame.itertuples()}
    alerts=[]
    for item in items:
        alerts.append(assess_article(symbol,item.title,item.body,item.source,quote.get("percent_change"),
                                     scored.get(item.title),1.0))
    return quote,prioritise(alerts)
