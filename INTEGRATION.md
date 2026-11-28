# Integration into the existing FinanciAI repository

Copy the folders from this update pack into the repository root. Existing folders should merge.

1. Copy `src/financiai_stock_signal/live_news_risk.py` and `live_news_service.py`.
2. Copy `pages/5_Live_News_Risk_Monitor.py`.
3. Copy `tests/test_live_news_risk.py`.
4. Copy `docs/LIVE_NEWS_METHOD.md`.
5. Merge the README text from `README_LIVE_NEWS_UPDATE.md` into the main `README.md`.
6. Merge dependencies from `requirements_LIVE_NEWS.txt` into `requirements.txt`.
7. Ensure `FINNHUB_API_KEY` is configured in `.env` locally or Streamlit secrets when deployed.
8. Run `PYTHONPATH=src pytest -q`.

Recommended commit:

```text
Add explainable live-news event-risk monitor
```
