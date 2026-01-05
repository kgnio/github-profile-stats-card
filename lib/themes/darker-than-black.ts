import type { Theme } from "@/types/theme";

export const darkerThanBlackTheme: Theme = {
  name: "darker-than-black",

  colors: {
    bgStops: ["#010103", "#04030A"],

    cardStroke: "#2A1015",
    divider: "#2A1015",
    panelBg: "#07030A",
    panelStroke: "#351017",

    textStrong: "#FFF5F6",
    textMuted: "#E6CCD0",
    textDim: "#B78C95",

    accentStops: ["#FB2C3A", "#7C3AED", "#F43F5E"],
    chartFill: "#FB2C3A",

    listLabel: "#FB2C3A",
    listValue: "#FFE4E6",
    listIcon: "#FB2C3A",

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
    shadowDy: 16,
    shadowBlur: 26,
    shadowOpacity: 0.34,

    leftDividerX: 430,
    rightDividerX: 750,
    dividerTopY: 52,
    dividerBottomY: 52,
    strokeDivider: 1,

    dividerStyle: "solid",
    dividerDash: "0 0",

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
    chartStroke: 2.9,

    chartVariant: "lollipop",
    chartGrid: true,
    chartLineDash: undefined,

    chartDotR: 3.8,
    chartBarGap: 0,
    chartBarRadius: 10,

    gridLines: 4,
    gridOpacity: 0.84,

    chartFillOpacityTop: 0.22,
    chartFillOpacityBottom: 0,

    chartLabelFontSize: 11,
    chartLabelLeftText: "Last 30 days",
    chartLabelRightPrefix: "max",
    chartLabelBottomPad: 3,
    chartMaxLabelY: 18,

    metricsY: 134,

    totalFontSize: 30,
    totalFontWeight: 850,
    totalLabelX: 104,
    totalLabelText: "Total contributions",
    totalLabelFontSize: 14,
    totalLabelFontWeight: 690,

    lastActiveRowY: 30,
    lastActiveLabelText: "Last active",
    lastActiveLabelFontSize: 12,
    lastActiveValueX: 74,
    lastActiveValueFontSize: 12,
    lastActiveValueFontWeight: 740,

    ringCenterY: 118,
    ringYOffset: -10,
    ringR: 52,
    ringStroke: 10,

    ringValueDy: 16,
    ringValueFontSize: 40,
    ringValueFontWeight: 930,

    streakTitleDy: 84,
    streakTitleFontSize: 14,
    streakTitleFontWeight: 540,

    streakDescDy: 104,
    streakDescFontSize: 12,
    streakDescFontWeight: 480,

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
    listLabelWeight: 720,
    listValueWeight: 900,
  },
};
