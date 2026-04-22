/* =======================================================================
 *  Clean Technology — Data Module
 *  Figures compiled from IEA (World Energy Outlook 2024, WEI 2024, Renewables
 *  2024), IRENA (Renewable Capacity Statistics 2024, Renewable Power Costs
 *  2023), BloombergNEF (LCOE 2H 2024, EV Outlook 2024), Lazard LCOE v17,
 *  IPCC AR6 WGIII Annex III lifecycle emission factors.
 *  Values are rounded for readability.
 * ======================================================================= */

const CleanTech = {
  /* ------------------------------------------------------------------ */
  /*  Technology profiles for the interactive explorer                    */
  /* ------------------------------------------------------------------ */
  technologies: [
    {
      id: "solar",
      name: "Solar Photovoltaics",
      tag: "Generation",
      tagline: "The cheapest electricity ever produced.",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
      description:
        "Silicon photovoltaic panels convert sunlight directly into electricity. Thanks to a 27% learning rate — every doubling of cumulative production cuts costs by a quarter — utility-scale solar is now the lowest-cost source of new electricity in more than 90% of the world.",
      metrics: [
        { label: "Global capacity", value: "2.1 TW" },
        { label: "LCOE (2024)", value: "$29/MWh" },
        { label: "CO₂ intensity", value: "41 gCO₂/kWh" },
        { label: "Annual growth", value: "+35%" }
      ],
      bars: [
        { label: "Maturity", value: 95 },
        { label: "Cost leadership", value: 98 },
        { label: "Deployment speed", value: 92 },
        { label: "Scalability", value: 96 }
      ]
    },
    {
      id: "wind",
      name: "Wind Power",
      tag: "Generation",
      tagline: "Turbines now rival the Eiffel Tower in height.",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="M12 10l5 -6"/><path d="M12 10l-5 -6"/><path d="M12 10l6 4"/><path d="M12 10l-6 4"/><path d="M12 10v12"/></svg>`,
      description:
        "Onshore and offshore wind harvest kinetic energy at massive scale. Modern 15 MW offshore turbines power 18,000 homes each. Offshore wind is emerging as a complementary backbone to solar, with steadier capacity factors (45–55%).",
      metrics: [
        { label: "Global capacity", value: "1.1 TW" },
        { label: "LCOE onshore", value: "$40/MWh" },
        { label: "LCOE offshore", value: "$74/MWh" },
        { label: "Largest turbine", value: "18 MW" }
      ],
      bars: [
        { label: "Maturity", value: 92 },
        { label: "Cost leadership", value: 85 },
        { label: "Deployment speed", value: 75 },
        { label: "Scalability", value: 88 }
      ]
    },
    {
      id: "battery",
      name: "Battery Storage",
      tag: "Storage",
      tagline: "Grid batteries scaled 80× in four years.",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/><line x1="14" y1="10" x2="14" y2="14"/></svg>`,
      description:
        "Lithium-ion battery systems shift renewable generation across hours and days, smoothing intermittency. Pack prices fell from $780/kWh in 2013 to $115/kWh in 2024. Sodium-ion and iron-air chemistries are now entering commercial service for long-duration storage.",
      metrics: [
        { label: "Global capacity", value: "180 GWh" },
        { label: "Pack price", value: "$115/kWh" },
        { label: "Round-trip eff.", value: "92%" },
        { label: "Cost decline", value: "90% / decade" }
      ],
      bars: [
        { label: "Maturity", value: 82 },
        { label: "Cost leadership", value: 78 },
        { label: "Deployment speed", value: 88 },
        { label: "Scalability", value: 90 }
      ]
    },
    {
      id: "ev",
      name: "Electric Vehicles",
      tag: "Transport",
      tagline: "1 in 5 new cars sold is electric.",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2h4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5l-2-5H5l-2 5v5z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
      description:
        "Battery-electric vehicles eliminate tailpipe emissions and are 3–4× more efficient than internal-combustion cars. China, the EU, and Nordics lead adoption. Global EV stock surpassed 45 million in 2024 and is on track to exceed 250 million by 2030.",
      metrics: [
        { label: "Global stock", value: "45M+" },
        { label: "2024 sales share", value: "22%" },
        { label: "Avg. range", value: "370 km" },
        { label: "Well-to-wheel CO₂", value: "−60% vs ICE" }
      ],
      bars: [
        { label: "Maturity", value: 80 },
        { label: "Cost leadership", value: 72 },
        { label: "Deployment speed", value: 94 },
        { label: "Scalability", value: 85 }
      ]
    },
    {
      id: "hydrogen",
      name: "Green Hydrogen",
      tag: "Fuels",
      tagline: "Decarbonising what electrons can't reach.",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 7 5 10 5 14a7 7 0 0 0 14 0c0-4-3-7-7-12z"/></svg>`,
      description:
        "Produced by splitting water with renewable electricity, green hydrogen (and derivatives like green ammonia and e-methanol) is the leading option for hard-to-electrify sectors: steel, shipping, long-haul aviation, fertilizer. Costs remain the chief barrier ($4–8/kg today vs $1–2/kg target).",
      metrics: [
        { label: "Production today", value: "1 Mt/yr" },
        { label: "Pipeline 2030", value: "40 Mt/yr" },
        { label: "Cost target", value: "$1.5/kg" },
        { label: "Addressable TAM", value: "$700B" }
      ],
      bars: [
        { label: "Maturity", value: 45 },
        { label: "Cost leadership", value: 30 },
        { label: "Deployment speed", value: 50 },
        { label: "Scalability", value: 70 }
      ]
    },
    {
      id: "ccus",
      name: "Carbon Removal & CCUS",
      tag: "Mitigation",
      tagline: "The cleanup crew for residual emissions.",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16M6 15c0-3 3-5 6-5s6 2 6 5"/><path d="M9 11V7a3 3 0 0 1 6 0v4"/></svg>`,
      description:
        "Direct Air Capture, BECCS, mineralization and enhanced weathering address residual emissions from agriculture, cement, and steel. Capacity is small today (~0.01 Mt DAC) but growing fast as compliance and voluntary carbon markets mature.",
      metrics: [
        { label: "Operating CCUS", value: "45 Mt/yr" },
        { label: "DAC capacity", value: "10 kt/yr" },
        { label: "DAC cost", value: "$400–600/t" },
        { label: "2050 requirement", value: "5 Gt/yr" }
      ],
      bars: [
        { label: "Maturity", value: 35 },
        { label: "Cost leadership", value: 20 },
        { label: "Deployment speed", value: 40 },
        { label: "Scalability", value: 60 }
      ]
    }
  ],

  /* ------------------------------------------------------------------ */
  /*  LCOE over time — unsubsidized, utility scale, $/MWh                */
  /* ------------------------------------------------------------------ */
  lcoe: {
    years: [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024],
    datasets: [
      { label: "Solar PV",         color: "#34d399", data: [359, 226, 148, 91, 59, 40, 36, 29] },
      { label: "Onshore Wind",     color: "#06b6d4", data: [135, 109, 83,  63, 50, 41, 40, 40] },
      { label: "Battery Storage",  color: "#a78bfa", data: [780, 630, 450, 290, 180, 137, 125, 115] },
      { label: "Coal (new)",       color: "#f87171", data: [111, 108, 109, 102, 102, 112, 118, 118] },
      { label: "Gas Combined Cycle", color: "#fbbf24", data: [83, 69, 74, 63, 60, 59, 72, 76] }
    ]
  },

  /* ------------------------------------------------------------------ */
  /*  Cumulative installed capacity (GW)                                 */
  /* ------------------------------------------------------------------ */
  capacity: {
    years: [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2025],
    datasets: [
      { label: "Solar PV", color: "#34d399",
        data: [40,   100,  180,  300,  485,  760,  1200, 1870, 2100] },
      { label: "Wind",     color: "#06b6d4",
        data: [198,  283,  370,  487,  591,  733,  900,  1050, 1130] },
      { label: "Hydro",    color: "#60a5fa",
        data: [1060, 1120, 1177, 1242, 1292, 1330, 1360, 1395, 1410] },
      { label: "Battery storage", color: "#a78bfa",
        data: [0.2,  0.4,  1.2,  3,    8,    17,   45,   140,  180] }
    ]
  },

  /* ------------------------------------------------------------------ */
  /*  Scenario simulator sources                                         */
  /*   emissions in kg CO2 per MWh (IPCC AR6 Annex III, median)         */
  /* ------------------------------------------------------------------ */
  scenario: {
    totalDemandTWh: 40000, // IEA NZE 2035 global electricity demand
    sources: [
      { id: "solar",   label: "Solar",      color: "#34d399", emission: 41,  start: 28 },
      { id: "wind",    label: "Wind",       color: "#06b6d4", emission: 11,  start: 22 },
      { id: "hydro",   label: "Hydro",      color: "#60a5fa", emission: 24,  start: 13 },
      { id: "nuclear", label: "Nuclear",    color: "#a78bfa", emission: 12,  start: 10 },
      { id: "gas",     label: "Natural Gas", color: "#fbbf24", emission: 490, start: 15 },
      { id: "coal",    label: "Coal",       color: "#f87171", emission: 820, start: 8 },
      { id: "other",   label: "Other clean", color: "#14b8a6", emission: 30,  start: 4 }
    ]
  },

  /* ------------------------------------------------------------------ */
  /*  Country clean-energy investment, 2024 (USD billions)                */
  /*  Source: IEA World Energy Investment 2024                           */
  /* ------------------------------------------------------------------ */
  leaderboard: [
    { country: "China",          flag: "🇨🇳", value: 675 },
    { country: "United States",  flag: "🇺🇸", value: 315 },
    { country: "European Union", flag: "🇪🇺", value: 370 },
    { country: "India",          flag: "🇮🇳", value: 68  },
    { country: "Japan",          flag: "🇯🇵", value: 58  },
    { country: "United Kingdom", flag: "🇬🇧", value: 45  },
    { country: "Brazil",         flag: "🇧🇷", value: 39  },
    { country: "Germany",        flag: "🇩🇪", value: 72  },
    { country: "Australia",      flag: "🇦🇺", value: 24  },
    { country: "Canada",         flag: "🇨🇦", value: 22  }
  ]
};

window.CleanTech = CleanTech;
