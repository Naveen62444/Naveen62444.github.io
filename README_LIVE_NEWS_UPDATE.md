# README update — live-news event-risk monitor

## Live news is the centre of FinanciAI

FinanciAI is mainly built around a simple question:

> **Has new information appeared that could materially change how the market views a company?**

The live-news monitor checks recent company headlines, searches for high-impact event language, optionally combines the result with FinBERT financial sentiment, and compares the alert with the latest available stock quote.

The user sees:

```text
Company: Example Corp
Latest available quote: -4.8%

Headline:
"Example Corp issues profit warning and cuts annual forecast"

Direction: Downside event
Seriousness: 9 / 10
Rule confidence: 79%
Matched phrases: profit warning, cuts forecast
Event types: guidance
```

FinanciAI deliberately does **not** say:

```text
THIS STOCK WILL CRASH
```

A headline cannot prove a future price move. The product uses careful labels:

- **Downside event** — potentially negative information requiring attention;
- **Mixed / unclear** — competing signals or insufficient evidence;
- **Upside event** — potentially positive information requiring attention.

### Initial event vocabulary

The transparent baseline recognises categories such as:

- solvency: bankruptcy, insolvency, default;
- legal: fraud, criminal/SEC investigation;
- safety: fatal incident, grounding, recall;
- cyber/operations: ransomware, data breach, global outage;
- distribution/product: removal from a platform, refunds, delays;
- reputation: boycott;
- guidance/earnings: profit warning, forecast cuts, estimate beats/misses;
- regulatory/product upside: FDA approval, commercial breakthrough;
- capital/commercial: buyback, dividend increase, contract win, partnership.

### Data providers

- [Finnhub company news](https://api.finnhub.io/docs/api/company-news): recent company headlines and latest quote snapshots.
- [Finnhub WebSocket](https://api.finnhub.io/docs/api/websocket-news): optional real-time streaming architecture, subject to plan/exchange coverage and API limits.
- [Alpha Vantage](https://www.alphavantage.co/documentation/): historical/intraday market data and News & Sentiment research feeds.
- [NewsAPI Everything](https://newsapi.org/docs/endpoints/everything): optional wider article discovery using keyword/phrase queries, dates, domains and publication-time sorting.
- [Reddit Data API](https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki): optional authorised social discussion, using OAuth, a descriptive User-Agent and deletion/retention compliance.
- [ProsusAI FinBERT](https://huggingface.co/ProsusAI/finbert): positive, neutral and negative sentiment probabilities for financial text. Review the model-weight licence before commercial use.

### Validation roadmap

- [x] Explainable keyword/event baseline
- [x] Seriousness score from 1–10
- [x] Downside / mixed / upside event classes
- [x] Current quote-reaction comparison
- [x] Streamlit live-news page
- [x] Unit tests
- [ ] Entity/ticker relevance model
- [ ] News deduplication
- [ ] Exchange-hours alignment
- [ ] FinBERT integration in the live page
- [ ] Probability calibration
- [ ] Historical backtest by event category
- [ ] Email/push alerts with user opt-in
- [ ] False-positive review dashboard

This is a research alert system, not financial advice. The SEC warns investors not to make decisions based only on information found on social media, because stock tips and apparently authoritative posts can be misleading or fraudulent.
