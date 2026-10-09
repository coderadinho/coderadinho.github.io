# Conrad’s website

Personal homepage: `index.html`. PP434 weekly charts: `portfolio.html`.
The portfolio contains the three existing visuals and two new Week 2 Vega-Lite charts.
This is a provisional course foundation, not a completed final project or a claim that all portfolio challenges are complete.

## Week 2 data and replication

- METR, *Task-Completion Time Horizons of Frontier AI Models*: https://metr.org/time-horizons/
  Published Horizon v1.1 summary: https://metr.org/assets/benchmark_results_1_1.yaml
  Citation: METR (2025), *Measuring AI Ability to Complete Long Tasks*, https://arxiv.org/abs/2503.14499
  Human task minutes at 50% and 80% predicted success, with source uncertainty bounds. Estimates above 16 hours are flagged. Tasks mainly concern software engineering, ML and cybersecurity; they do not measure economy-wide job automation. The source page is no longer actively updated; last page update 8 September 2026.
- Epoch AI, *Data on AI models*: https://epoch.ai/data/ai-models
  CSV: https://epoch.ai/data/all_ai_models.csv
  Data licensed CC BY, attribution to Epoch AI. Source page updated 8 October 2026.
  Filter: language-domain records with publication dates between 2017-01-01 and 2026-10-09 and finite positive training compute. Source confidence labels retained. Missing estimates are excluded, not replaced with zero. This is training compute, not a capability benchmark.

The downloaded originals are in `data/sources/`; derived chart data are in `data/`.
Retrieval dates, hashes and sizes are in `data/source-manifest.json`.
`python3 tools/build_chart_data.py` regenerates the two derived datasets from the saved originals.
Requires Python 3 and Ruby’s standard YAML library; no web framework or build service.
The charts are adaptations of the line/scatter Vega-Lite grammar used by the original course examples, with local datasets, interactive source-confidence/success-threshold controls and responsive sizing.

To refresh, download the original public URLs into their matching files, review schema/source changes, update the cutoff in the script if appropriate, rebuild, and update the manifest’s retrieval dates and hashes. Refreshing is manual; no scheduled downloads have been installed.

Serve this folder with `python3 -m http.server 8765` to preview the site. Opening HTML directly as a file may prevent JSON loading.

## Existing work

The Week 1 course examples remain clearly identified as examples. The existing ST443 IBL figure is retained in `assets/st443-ibl-results.png`, from https://github.com/coderadinho/coderadinho/blob/main/Plots/plot_model_results.png. Original example files and earlier chart JSON remain preserved.

## Technical assistance

OpenAI Codex assisted with public-data retrieval and cleaning, Vega-Lite implementation, HTML/CSS/JavaScript, and debugging. No assessed analytical prose or conclusions have been supplied. Conrad retains topic selection, analysis and assessed writing. This disclosure records the technical assistance used in this iteration.

## Checkpoint: 9 October 2026

Today’s class target is two new charts using downloaded data, saved chart JSON, HTML embedding and GitHub upload (five existing/new visuals in total). This checkpoint uses those session instructions. It does not replace the separate CC1/CC2 briefs or certify completion of those challenges.

Downloaded source bytes are preserved exactly, including original whitespace; `.gitattributes` exempts these snapshots from whitespace lint. This keeps the provenance hashes reproducible.
