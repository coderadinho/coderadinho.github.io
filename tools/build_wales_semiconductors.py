"""Rebuild CC6/CC7 plot data from preserved, verified Nomis CSV snapshots.
For fresh API downloads, use the CC6 notebook in live mode. No network required.
"""
from pathlib import Path
import csv, json, math
ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/wales-semiconductors"
AREAS = [("newport","W06000022","Newport"),("cardiff","W06000015","Cardiff"),
         ("monmouthshire","W06000021","Monmouthshire"),("wrexham","W06000006","Wrexham"),
         ("flintshire","W06000005","Flintshire"),("torfaen","W06000020","Torfaen")]
def save(name, rows):
    (DATA / name).write_text(json.dumps(rows, indent=2) + "\n")
source = list(csv.DictReader((DATA / "sources/six_area_timeseries.csv").open()))
combined = []
for slug, code, name in AREAS:
    rows = [{"year":int(v["DATE_NAME"]),"area":name,"code":code,
             "employees":float(v["OBS_VALUE"]),"status":v["OBS_STATUS_NAME"]}
            for v in source if v["GEOGRAPHY_CODE"] == code]
    assert len(rows) == 10 and all(v["status"] == "Normal Value" for v in rows)
    baseline = next(v["employees"] for v in rows if v["year"] == 2015)
    for v in rows: v["index_2015"] = round(v["employees"] / baseline * 100, 2) if baseline else None
    save(slug+".json", rows)
    combined.extend(rows)
save("timeseries.json", combined)
groups = {}
for v in csv.DictReader((DATA / "sources/wales_local_map.csv").open()):
    assert v["DATE_NAME"] == "2024"
    row = groups.setdefault(v["GEOGRAPHY_CODE"], {"code":v["GEOGRAPHY_CODE"],"area":v["GEOGRAPHY_NAME"],"year":2024})
    field = "employees" if int(v["INDUSTRY"]) == 134243838 else "all_employees"
    row[field] = float(v["OBS_VALUE"]) if v["OBS_STATUS_NAME"] == "Normal Value" else None
for v in groups.values():
    v["share_pct"] = round(v["employees"] / v["all_employees"] * 100,4) if v["employees"] is not None and v["all_employees"] else None
save("employment-map.json", list(groups.values()))
boundaries = json.loads((DATA / "wales-lad-2024.geojson").read_text())
assert {f["properties"]["LAD24CD"] for f in boundaries["features"]} == set(groups)
assert len(groups) == 22 and len(combined) == 60
print("Rebuilt 60 annual observations; joined 22 of 22 Welsh authorities.")
