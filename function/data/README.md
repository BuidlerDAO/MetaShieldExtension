```
cd ./function
// 检查黑名单中还存活的网站至 domain_use_balcklist.json
python3 domain_auto_fix_data.py
// 筛选不在黑白名单内的高频网站
python3 analysis_data_fiter.py
// 更新合约黑名单
python3 ./data/contract_blacklist_fix.py --url api --key yourkey
```