import requests



uid = "7348163959"
s = "a8547555"

headers = {
    "User-Agent": "unknown-unknown__weibo__9.12.0__android__android9"
}

params = {
    "s": s,
    "c": "android",
    #"ua": "unknown-unknown__weibo__9.12.0__android__android9",
    #"aid": "01A_Q_XEOsTogTRauFyPCTx_7L-gm3Fd3mXwyKmsVYsX7JV_c.",
    #"cum": "19840369",
    "from": "109C095010",
    "gsid": "_2A25w-AYUDeRxGeBO71sT-S7EzD6IHXVRrB7crDV6PUJbkdANLRD1kWpNRe_IHUVFm7lPwI_plrONy0EuCP0zH4ch",
}

data = {
    "extparam": "discover|new_feed",
#    "uid": uid,
#    "ignore_inturrpted_error": "true",
#    "max_adid": 0,
    "count": 15,
#    "need_jump_scheme": 1,
#    "refresh_sourceid": 10000001,
    "containerid": 102803,
#    "load_mode": 0,
#    "since_id": 0,
}

url = "https://api.weibo.cn/2/statuses/unread_hot_timeline"

resp = requests.post(url, data=data, params=params, headers=headers)
print(resp.text)
# print(resp.url)
