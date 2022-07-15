import json

analysis_data = """site:etherscan.io,32,21,0,0.00
site:genie.xyz,32,28,0,0.00"""

with open("./data/domain_whitelist.json", 'r') as f:
    whitelist_data: list = json.load(f)

with open("./data/domain_use_blacklist.json", 'r') as f:
    blacklist_data: list = json.load(f)

analysis_site_list = []
site_data_split_list = analysis_data.split('\n')
for site in site_data_split_list:
    site_name = site.split(',')[0]
    if site_name.startswith('site:'):
        site_url = site_name.split(':')[1]
        if (site_url not in whitelist_data) & (site_url not in blacklist_data):
            analysis_site_list.append(site_url)

print(analysis_site_list)
