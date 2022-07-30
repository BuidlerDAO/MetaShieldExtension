
import requests
import time
import json
import argparse
# https://docs.python.org/zh-cn/3.6/library/argparse.html
parser = argparse.ArgumentParser()
parser.add_argument('--url', help='url help')
parser.add_argument('--key', help='key help')

args = parser.parse_args()


def get_contract_blacklist_data(url, key):
    now_time = time.strftime("%Y-%m-%d", time.localtime())
    url = str(url) + "?start=2022-07-20&end={}".format(now_time)
    headers = {"Authorization-Key": str(key)}
    try:
        response = requests.get(url, headers=headers)
        print('response.status_code', response.status_code)
        assert(response.status_code == 200)
        black_contract_data_list = eval(response.text.replace(
            "true", "True").replace("flase", "Flase"))['data']
        print('black_contract_data_list_count:', len(black_contract_data_list))
        assert(len(black_contract_data_list) > 0)
        with open('./data/contract_blacklist.json', 'r') as init_data_file:
            init_blacklist_data = json.load(init_data_file)
            print('init_blacklist_data:', len(init_blacklist_data))
            init_data_file.close()
        updated_blacklist_data = init_blacklist_data + \
            [x['address'] for x in black_contract_data_list]
        updated_blacklist_data = list(set(updated_blacklist_data))
        print('updated_blacklist_data_count:', len(updated_blacklist_data))
        assert(len(updated_blacklist_data) > 10000)
        with open('./data/contract_blacklist.json', 'w') as f:
            json.dump(updated_blacklist_data, f)
    except Exception as e:
        print(e)


start = time.perf_counter()
get_contract_blacklist_data(args.url, args.key)
end = time.perf_counter()
print("time consuming : %.2fs" % (end - start))
