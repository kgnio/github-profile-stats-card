import type { Theme } from "@/types/theme";

export const cyberCityTheme: Theme = {
  name: "cyber-city",

  colors: {
    bgStops: ["#070412", "#0B0720"],

    cardStroke: "#2A1B46",
    divider: "#2A1B46",
    panelBg: "#0A061A",
    panelStroke: "#2A1B46",

    textStrong: "#FDF4FF",
    textMuted: "#C4B5FD",
    textDim: "#22D3EE",

    accentStops: ["#22D3EE", "#A78BFA", "#F472B6"],
    chartFill: "#22D3EE",

    listLabel: "#A78BFA",
    listValue: "#E0F2FE",
    listIcon: "#22D3EE",

    shadowColor: "#000000",
  },

  layout: {
    fontFamily:
      '"Segoe UI","SF Pro Display",-apple-system,system-ui,Roboto,Helvetica,Arial,sans-serif',

    cardW: 1080,
    cardH: 260,
    cardPad: 14,

    radiusCard: 28,
    strokeCard: 1,
    shadowDx: 0,
    shadowDy: 10,
    shadowBlur: 16,
    shadowOpacity: 0.18,

    leftDividerX: 430,
    rightDividerX: 750,
    dividerTopY: 52,
    dividerBottomY: 52,
    strokeDivider: 1,

    dividerStyle: "dashed",
    dividerDash: "3 7",

    accentShapeVariant: "diagonal",
    accentShapeX1: 360,
    accentShapeX2: 140,
    accentShapeX3: 40,
    accentShapeX4: 260,
    accentShapeOpacity: 0.06,

    leftColX: 48,
    leftTopY: 58,

    chartW: 340,
    chartH: 96,
    radiusPanel: 18,

    chartPad: 14,
    chartStroke: 2.4,

    chartVariant: "steps",
    chartGrid: false,
    chartLineDash: undefined,

    chartBarGap: 4,
    chartBarRadius: 8,
    chartDotR: 3,

    gridLines: 4,
    gridOpacity: 0.55,

    chartFillOpacityTop: 0.16,
    chartFillOpacityBottom: 0,

    chartLabelFontSize: 11,
    chartLabelLeftText: "Last 30 days",
    chartLabelRightPrefix: "max",
    chartLabelBottomPad: 3,
    chartMaxLabelY: 18,

    metricsY: 134,

    totalFontSize: 30,
    totalFontWeight: 820,
    totalLabelX: 104,
    totalLabelText: "Total contributions",
    totalLabelFontSize: 14,
    totalLabelFontWeight: 650,

    lastActiveRowY: 30,
    lastActiveLabelText: "Last active",
    lastActiveLabelFontSize: 12,
    lastActiveValueX: 74,
    lastActiveValueFontSize: 12,
    lastActiveValueFontWeight: 700,

    ringCenterY: 118,
    ringYOffset: -10,
    ringR: 52,
    ringStroke: 10,

    ringValueDy: 16,
    ringValueFontSize: 40,
    ringValueFontWeight: 900,

    streakTitleDy: 84,
    streakTitleFontSize: 14,
    streakTitleFontWeight: 450,

    streakDescDy: 104,
    streakDescFontSize: 12,
    streakDescFontWeight: 420,

    listXPad: 28,
    listY: 66,
    listRowH: 32,

    listIconBox: 20,
    listIconDy: -15,
    listIconOpacity: 0.92,
    listIconStroke: 2,

    listLabelX: 30,
    listValueX: 186,
    listFontSize: 14.5,
    listLabelWeight: 650,
    listValueWeight: 850,
  },
};
