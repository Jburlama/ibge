import requests
import json
import pandas as pd
from tabulate import tabulate


r = requests.get("https://servicodados.ibge.gov.br/api/v3/agregados")

df = pd.read_json("agregados.json")


table = tabulate(df)

print(table)
