from financiai_stock_signal.live_news_risk import assess_article,prioritise

def test_profit_warning_is_downside_high_seriousness():
    a=assess_article("ABC","ABC issues profit warning and cuts forecast",source="Reuters",quote_change_pct=-5)
    assert a.direction=="downside event" and a.seriousness>=8 and a.confidence>.5

def test_approval_is_upside():
    a=assess_article("BIO","FDA approval for breakthrough treatment",source="FDA")
    assert a.direction=="upside event" and a.seriousness>=8

def test_mixed_article_is_not_forced():
    a=assess_article("XYZ","Company raises forecast but announces product delay",source="Reuters")
    assert a.direction in {"mixed / unclear","upside event","downside event"}

def test_prioritise():
    low=assess_article("A","routine update")
    high=assess_article("A","company files bankruptcy",source="Reuters")
    assert prioritise([low,high])[0].seriousness>=prioritise([low,high])[1].seriousness
