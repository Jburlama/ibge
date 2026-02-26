import requests
import json
import pandas as pd
from tabulate import tabulate
import unicodedata
import re

def slugify(text):
    """
    Convert text to a safe filename:
    - lower case
    - replace spaces with hyphens
    - remove accents
    - keep only ASCII letters, digits, hyphens
    """
    # Normalize to decomposed form and remove combining diacritics
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    # Lowercase and replace spaces with hyphens
    text = text.lower().replace(' ', '-')
    # Remove any remaining non-alphanumeric characters (keep hyphens)
    text = re.sub(r'[^a-z0-9-]', '', text)
    return text

def main():
    # 1. Fetch data from IBGE API
    url = "https://servicodados.ibge.gov.br/api/v3/agregados"
    print(f"Fetching data from {url}...")
    response = requests.get(url)
    data = response.json()

    # 2. Save full response as JSON
    with open("agregacao.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("agregacao.json saved.")

    # 3. Build overall DataFrame (id, nome, number of agregados)
    overall_list = []
    for item in data:
        overall_list.append({
            "id": item["id"],
            "nome": item["nome"],
            "total_agregados": len(item["agregados"])
        })
    overall_df = pd.DataFrame(overall_list)

    # Save overall CSV
    overall_df.to_csv("agregacao.csv", index=False, encoding="utf-8-sig")
    print("agregacao.csv saved.")

    # Save overall TXT (grid table)
    with open("agregacao.txt", "w", encoding="utf-8") as f:
        f.write(tabulate(overall_df, headers="keys", tablefmt="grid"))
    print("agregacao.txt saved.")

    # 4. Process each top‑level aggregation
    for item in data:
        nome = item["nome"]
        slug = slugify(nome)

        # JSON file
        with open(f"{slug}.json", "w", encoding="utf-8") as f:
            json.dump(item, f, indent=2, ensure_ascii=False)
        print(f"{slug}.json saved.")

        # CSV file – containing the list of 'agregados'
        sub_df = pd.DataFrame(item["agregados"])
        sub_df.to_csv(f"{slug}.csv", index=False, encoding="utf-8-sig")
        print(f"{slug}.csv saved.")

        # TXT file – table of 'agregados'
        with open(f"{slug}.txt", "w", encoding="utf-8") as f:
            f.write(tabulate(sub_df, headers="keys", tablefmt="grid"))
        print(f"{slug}.txt saved.")

if __name__ == "__main__":
    main()
