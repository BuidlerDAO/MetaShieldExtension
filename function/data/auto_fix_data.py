import json
import re
import requests
import threading
import queue
import time

blacklist = []
error_list = []

with open("./data/blacklist.json", 'r') as f:
    data: list = json.load(f)


def get_link(string):
    pattern = re.compile(
        r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
    urls = re.findall(pattern, str(string))
    return urls


def to_json_file(data, path='./data.json'):
    with open(path, 'w') as f:
        json.dump(data, f)


def check_response(url):
    try:
        res = requests.get(url, timeout=0.1)
        if res.status_code == 200:
            u = url.split(
                'https://')[-1].split('http://')[-1].split('www.')[-1]
            blacklist.append(u)
    except Exception as e:
        error_list.append(url)
        # print(url, str(e))


q = queue.Queue(200)
n = 0


def put_work():
    while True:
        global n
        print(n/len(data))
        if n == len(data):
            break
        elif q.full():
            time.sleep(0.5)
        else:
            q.put(data[n])
            n += 1


def work():
    while True:
        if q.empty():
            break
        else:
            target_url = q.get()
            check_response(target_url)


threads = []
thread_num = 100
for i in range(thread_num):
    t_put = threading.Thread(target=put_work)
    t_get = threading.Thread(target=work)
    threads.append(t_put)
    threads.append(t_get)


for i in range(thread_num):
    threads[i].start()
for i in range(thread_num):
    threads[i].join()


to_json_file(blacklist, './data/use_blacklist.json')
to_json_file(error_list, './data/error_list.json')
