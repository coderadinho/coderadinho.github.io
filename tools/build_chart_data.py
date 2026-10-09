#!/usr/bin/env python3
"""Rebuild chart data from locally saved public sources; Python stdlib + Ruby YAML."""
import csv, datetime, hashlib, json, math, pathlib, subprocess
ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCES = ROOT / 'data/sources'
def save(path, value):
    (ROOT / path).write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n')
raw = subprocess.check_output(['ruby', '-ryaml', '-rjson', '-rdate', '-e',
    'puts JSON.generate(YAML.safe_load(File.read(ARGV[0]), permitted_classes: [Date]))',
    str(SOURCES / 'metr-time-horizons.yaml')], text=True)
m = json.loads(raw)
metr = []
for model, result in m['results'].items():
    for threshold in (50, 80):
        metric = result['metrics'].get(f'p{threshold}_horizon_length')
        if not metric or metric['estimate'] <= 0:
            continue
        vendor = 'Anthropic' if model.startswith('claude') else 'Google' if model.startswith('gemini') else 'OpenAI' if model.startswith(('gpt', 'o1', 'o3', 'o4')) else 'Other'
        metr.append({'model': model, 'release_date': result['release_date'], 'provider': vendor,
            'threshold': f'{threshold}%', 'minutes': metric['estimate'],
            'ci_low': metric.get('ci_low'), 'ci_high': metric.get('ci_high'),
            'measurement': 'Above 16-hour limit' if metric['estimate'] > 960 else 'Within measured range'})
save('data/metr-horizons.json', metr)
epoch = []
with (SOURCES / 'epoch-ai-models.csv').open(newline='') as f:
    source_rows = list(csv.DictReader(f))
for row in source_rows:
    if 'Language' not in row['Domain'] or not ('2017-01-01' <= row['Publication date'] <= '2026-10-09'):
        continue
    try:
        compute = float(row['Training compute (FLOP)'])
    except ValueError:
        continue
    if not math.isfinite(compute) or compute <= 0:
        continue
    epoch.append({'model': row['Model'], 'date': row['Publication date'], 'compute': compute,
        'organization': row['Organization'], 'country': row['Country (of organization)'],
        'confidence': row['Confidence'], 'accessibility': row['Model accessibility'],
        'reference': row['Link']})
save('data/epoch-language-models.json', epoch)
print(json.dumps({'metr_records': len(metr), 'epoch_plotted': len(epoch), 'epoch_source_records': len(source_rows)}))
