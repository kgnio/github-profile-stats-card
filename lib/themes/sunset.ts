import type { Theme } from "@/types/theme";

export const sunsetTheme: Theme = {
  name: "sunset",

  colors: {
    bgStops: ["#FFF3E6", "#FFE1CF"],
    cardStroke: "#F6C3A6",
    divider: "#F6C3A6",
    panelBg: "#FFFFFF",
    panelStroke: "#F6C3A6",

    textStrong: "#2B1410",
    textMuted: "#7A3E2E",
    textDim: "#B06A55",
    accentStops: ["#FB7185", "#FB923C", "#A78BFA"],
    chartFill: "#FB923C",
    listLabel: "#F97316",
    listValue: "#7C2D12",
    listIcon: "#F97316",

    shadowColor: "#000000",
  },

  layout: {
    fontFamily:
      '"Plus Jakarta Sans","Inter","Segoe UI",ui-sans-serif,system-ui,-apple-system,Roboto,Helvetica,Arial,sans-serif',

    cardW: 1080,
    cardH: 260,
    cardPad: 14,
    radiusCard: 26,
    strokeCard: 1,

    shadowDx: 0,
    shadowDy: 10,
    shadowBlur: 18,
    shadowOpacity: 0.11,
    leftDividerX: 430,
    rightDividerX: 750,
    dividerTopY: 52,
    dividerBottomY: 52,
    strokeDivider: 2,

    dividerStyle: "dashed",
    dividerDash: "12 10",
    accentShapeVariant: "diagonal",
    accentShapeX1: 360,
    accentShapeX2: 140,
    accentShapeX3: 40,
    accentShapeX4: 260,
    accentShapeOpacity: 0.05,
    leftColX: 48,
    leftTopY: 58,
    chartW: 340,
    chartH: 96,
    radiusPanel: 18,

    chartPad: 14,
    chartStroke: 2.4,

    chartVariant: "sparkbars",
    chartGrid: false,
    chartLineDash: undefined,

    chartDotR: undefined,
    chartBarGap: 0,
    chartBarRadius: 0,

    gridLines: 4,
    gridOpacity: 0.45,

    chartFillOpacityTop: 0.18,
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
    listIconOpacity: 0.9,
    listIconStroke: 2,

    listLabelX: 30,
    listValueX: 186,
    listFontSize: 14.5,
    listLabelWeight: 650,
    listValueWeight: 850,
  },
};
