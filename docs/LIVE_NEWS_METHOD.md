# Live-news risk method

## Purpose

The monitor provides a **heads-up** when recent company news contains language historically associated with material events. It does not declare that a stock will crash or rise.

## Pipeline

```text
Finnhub company news + latest quote
                ↓
Company/ticker relevance
                ↓
Explainable event keywords
                ↓
Optional FinBERT sentiment
                ↓
Event type + seriousness 1–10
                ↓
Compare with current quote direction
                ↓
Downside event / Mixed / Upside event
```

## Seriousness examples

- 9–10: bankruptcy, insolvency, criminal investigation, fatal safety incident, ransomware/global outage
- 7–8: recall, grounding, data breach, forecast cut, profit warning, FDA approval, major guidance raise
- 5–6: delay, boycott, partnership, layoffs, tariff exposure
- 1–4: low-impact or unclassified headline

Keyword weights are a transparent baseline. They must be validated against a labelled historical event dataset before being presented as measured predictive performance.

## Why quote confirmation is separate

If a negative event alert appears while the quote is already down materially, FinanciAI can increase alert confidence slightly. This still does not prove the article caused the move. Price may have moved before publication or for another reason.

## Recommended production safeguards

- deduplicate syndicated articles;
- resolve exact company/ticker mentions;
- store publication and ingestion timestamps;
- align news with exchange market hours;
- allow source credibility weighting;
- calibrate probabilities on held-out time periods;
- test price-only versus price + news models;
- log false positives and missed events;
- never phrase an alert as guaranteed investment advice.
