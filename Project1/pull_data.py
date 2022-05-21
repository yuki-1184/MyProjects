import json
import urllib.request
import pandas as pd

with open("api_key.json") as f:
    api_key = json.load(f)

url = "https://opendata.resas-portal.go.jp/api/v1/prefectures"
request = urllib.request.Request(url, headers=api_key)

print(request)

with urllib.request.urlopen(request) as response:
    data = response.read()
print(type(data))

d = json.loads(data)

print(d)