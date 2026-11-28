"""Drop-in Streamlit page for the FinanciAI repository."""
from __future__ import annotations
import os,time
import streamlit as st
from financiai_stock_signal.providers.finnhub import FinnhubProvider
from financiai_stock_signal.dashboard.watchlist import WATCHLIST
from financiai_stock_signal.live_news_service import analyse_company_news

st.set_page_config(page_title="Live News Risk Monitor",page_icon="📰",layout="wide")
st.title("Live News Risk Monitor")
st.write("FinanciAI watches recent company headlines, looks for high-impact event language and compares the alert with the latest available quote.")
st.warning("The monitor does not know that a stock will crash or rise. It highlights potential downside/upside event risk for research and verification.")
try:key=st.secrets.get("FINNHUB_API_KEY",os.getenv("FINNHUB_API_KEY",""))
except Exception:key=os.getenv("FINNHUB_API_KEY","")
if not key:st.error("FINNHUB_API_KEY is missing.");st.stop()
provider=FinnhubProvider(key)

symbol=st.selectbox("Company",list(WATCHLIST),format_func=lambda s:f"{WATCHLIST[s]} ({s})")
refresh=st.selectbox("Auto-refresh",["Off","60 seconds","5 minutes"],index=0)
if st.button("Check latest news",type="primary") or "alerts_loaded" not in st.session_state:
    st.session_state.alerts_loaded=True

with st.spinner("Checking recent headlines and quote reaction..."):
    try:quote,alerts=analyse_company_news(provider,symbol,days=2,limit=30)
    except Exception as exc:st.error(str(exc));st.stop()

c1,c2,c3=st.columns(3)
c1.metric("Latest available price",f"{quote['price']:,.2f}",f"{quote['percent_change']:+.2f}%")
c2.metric("Headlines checked",len(alerts));c3.metric("High-seriousness alerts",sum(a.seriousness>=7 for a in alerts))

for alert in alerts:
    colour="🔴" if alert.direction=="downside event" else "🟢" if alert.direction=="upside event" else "🟡"
    with st.expander(f"{colour} {alert.seriousness}/10 · {alert.direction.title()} · {alert.headline}"):
        st.write("**Seriousness:**",alert.seriousness,"/ 10")
        st.write("**Rule confidence:**",f"{alert.confidence:.0%}")
        st.write("**Matched phrases:**",", ".join(alert.matched_keywords) or "None")
        st.write("**Event types:**",", ".join(alert.event_types) or "Unclassified")
        st.write("**Current quote move:**",f"{alert.quote_change_pct:+.2f}%" if alert.quote_change_pct is not None else "Unavailable")
        st.info(alert.reason)

if refresh!="Off":
    seconds=60 if refresh=="60 seconds" else 300
    st.caption(f"This page will refresh in {seconds} seconds. Provider limits still apply.")
    time.sleep(seconds);st.rerun()
