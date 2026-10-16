# Conrad’s website

Personal site: https://coderadinho.github.io/

- `index.html`: introduction and selected projects.
- `work.html`: project cards and expanded descriptions.
- `thoughts.html`: notes index; no abundance draft is exhibited.
- `portfolio.html`: PP434 portfolio, newest exercises first (CC4, CC3, Week 2, Week 1).
- `project.html`: separate final-project page, currently in development.

Persimmon is the fixed palette, with a light/dark switch. Fraunces is self-hosted under the SIL Open Font License included in `assets/fonts/`. The site is static HTML/CSS/JavaScript; no build system is needed. Serve locally with `python3 -m http.server` to load chart data.

## Data, charts and replication

Vega-Lite specifications are in `charts/`; plotted data and provenance are in `data/`. This portfolio is work in progress, not a claim that every assessment requirement is complete.

- **CC4:** Bellaiche et al. (2023), Study 1, Figure 2, https://doi.org/10.1186/s41235-023-00499-6 . Original figure CC BY 4.0. Independently reconstructed participant means from the authors’ public OSF data, https://osf.io/cgw8v/ . All pictures were AI-generated; creator labels were randomized. The chart does not compare actual human and AI artists. `data/cc4-provenance.json` records aggregation, missing-value treatment, new decorative jitter and checks against published test statistics. Mean whiskers are ±1 standard error. Raw participant data and the source PDF are not redistributed here. The AI-Scholar media reproduction was identified in indexed coverage; exact live-media-image verification remains provisional. No original author plotting code was used.
- **CC3, costs:** Epoch AI, https://epoch.ai/publications/the-plunging-price-of-thought . Fifteen derived factual frontier records from the pinned report-linked cost analysis, with release dates, scores and costs. Prices are a retrospective snapshot, not historical API prices. Missing evaluations are not failures; no forecasts or interpolated accuracy. See `data/sources/epoch-inference-cost/provenance.json`. Raw third-party cost files are not redistributed and no raw-data licence is asserted.
- **CC3, consumer access:** Epoch AI, https://epoch.ai/data-insights/consumer-gpu-model-gap , article dated 15 August 2025. Record-high nonmissing GPQA-Diamond/MMLU-Pro scores for the article’s consumer and frontier selections; no extrapolation. Article snapshot, not the current frontier. Source and method in `data/sources/epoch-consumer-access/provenance.json`.
- **Week 2, task horizons:** METR Horizon v1.1, https://metr.org/time-horizons/ ; source snapshot https://metr.org/assets/benchmark_results_1_1.yaml . Human task duration at 50%/80% predicted success, with source uncertainty bounds. Estimates beyond 16 hours flagged. Primarily software, ML and cybersecurity tasks; not whole-job automation. Snapshot 9 October 2026; source page last updated 8 September 2026.
- **Week 2, training compute:** Epoch AI, https://epoch.ai/data/ai-models , CC BY attribution to Epoch AI. Language-model records published 2017–9 October 2026 with positive estimates; missing estimates excluded and confidence labels retained. FLOPs measure resource inputs, not model capability. Source updated 8 October 2026. Existing downloaded source bytes, hashes and `tools/build_chart_data.py` are retained from the earlier public release.
- **Week 1:** supplied course examples remain identified as examples. Their presence does not establish final CC1/CC2 compliance.

## Project figures

ST443, ST449, PP433 and PP422 figures are selected outputs from Conrad’s coursework; descriptions state his contributions and team attribution. The South Yorkshire view clips only the blank lower export band, transcribes the original ONS BRES 2024 source line below it, and links the unchanged full figure. No reports, notebooks, restricted course handouts or raw project datasets are published.

## Technical assistance

OpenAI Codex assisted with coding, debugging, public-data retrieval/cleaning, charts, accessibility and deployment. Conrad authored the assessed portfolio text; technical assistance did not draft assessed analytical prose. Personal website copy was developed with Conrad and revised directly by him. Full source/method details remain attached to individual charts.
