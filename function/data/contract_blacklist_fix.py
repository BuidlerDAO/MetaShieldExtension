
import requests
import time
import json
import argparse
# https://docs.python.org/zh-cn/3.6/library/argparse.html
parser = argparse.ArgumentParser()
parser.add_argument('--url', help='url help')
parser.add_argument('--key', help='key help')

start = time.perf_counter()
args = parser.parse_args()
print(args.url)
print(args.key)

now_time = (time.strftime("%Y-%m-%d", time.localtime()))
print(now_time)
print(time.localtime(time.time()))


def get_contract_blacklist_data(url, key):
    now_time = time.strftime("%Y-%m-%d", time.localtime())
    url = url + "?start=2020-07-10&end={}".format(now_time)
    headers = {
        "Authorization-Key": key}
    response = requests.get(url, headers=headers)

    black_contract_data_list = eval(response.text.replace(
        "true", "True").replace("flase", "Flase"))['data']
    print(len(black_contract_data_list))
    with open('./data/contract_black_list_complete.json', 'w') as f:
        json.dump([x['address'] for x in black_contract_data_list], f)


get_contract_blacklist_data(args.url, args.key)

end = time.perf_counter()
print("time consuming : %.2fs" % (end - start))
