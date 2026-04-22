# Clean Technology — An Interactive Briefing

A professional-grade, data-driven single-page site exploring the six technologies driving the global energy transition: solar, wind, battery storage, electric vehicles, green hydrogen, and carbon capture & removal.

Built as a static site (no build step, no framework) so it deploys instantly on Cloudflare Pages, GitHub Pages, Netlify, or any static host.

## Features

- **Animated hero** with real-time counting key-stat cards
- **Interactive timeline** of the energy transition (2010 → 2030)
- **Technology Explorer** — six detailed profiles with live metric bars
- **Cost Revolution chart** — LCOE decline for solar, wind, batteries vs coal/gas (toggle linear/log)
- **Capacity growth chart** — stacked cumulative installed capacity, 2010–2025
- **Scenario Simulator** — interactive sliders to build a 2035 electricity mix, with a live CO₂ gauge vs the 1.5°C pathway
- **Country leaderboard** — 2024 clean-energy investment
- Responsive, dark theme, reduced-motion friendly, accessible navigation

## Tech stack

- Vanilla HTML / CSS / JavaScript
- [Chart.js](https://www.chartjs.org/) v4 (loaded from CDN)
- Google Fonts: Inter + Space Grotesk
- Zero build tooling required

## Local preview

```bash
# Any static server will do. Example with Python:
python3 -m http.server 8000
# Then open http://localhost:8000
```

Or with Node:

```bash
npx serve .
```

## Deploy on Cloudflare Pages

1. Push this repo to GitHub (already done).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the `CT-IV` repository.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. Deploy. Your site will be live at `<project>.pages.dev` within ~30 seconds.

Because there is no build step, deploys complete in seconds.

## File structure

```
.
├── index.html           # Markup & section structure
├── styles/
│   └── main.css         # Design system, layout, animations
├── scripts/
│   ├── data.js          # Compiled datasets (IEA, IRENA, BNEF, Lazard, IPCC)
│   └── app.js           # Interactivity, charts, simulator logic
└── README.md
```

## Data sources

- IEA — *World Energy Outlook 2024*, *World Energy Investment 2024*, *Renewables 2024*
- IRENA — *Renewable Capacity Statistics 2024*, *Renewable Power Costs 2023*
- BloombergNEF — *LCOE 2H 2024*, *EV Outlook 2024*, *Battery Price Survey 2024*
- Lazard — *Levelized Cost of Energy v17*
- IPCC AR6 WGIII — *Annex III lifecycle emission factors*

Figures are rounded for readability. See `scripts/data.js` for the exact values used.

## License

MIT — data sources retain their respective licenses and should be cited when reused.
