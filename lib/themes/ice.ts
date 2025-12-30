import type { Theme } from "@/types/theme";

export const iceTheme: Theme = {
  name: "ice",
  colors: {
    bgStops: ["#06111D", "#071A2C"],
    cardStroke: "#16324A",
    divider: "#16324A",
    panelBg: "#081726",
    panelStroke: "#16324A",

    textStrong: "#E6F4FF",
    textMuted: "#9CC7E6",
    textDim: "#6FA7CC",

    accentStops: ["#38BDF8", "#22C55E", "#A78BFA"],
    chartFill: "#38BDF8",

    listLabel: "#38BDF8",
    listValue: "#BAE6FD",
    listIcon: "#38BDF8",

    shadowColor: "#000000",
  },

  layout: {
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",

    cardW: 1080,
    cardH: 260,
    cardPad: 14,

    radiusCard: 20,
    strokeCard: 1,

    shadowDx: 0,
    shadowDy: 8,
    shadowBlur: 12,
    shadowOpacity: 0.22,

    leftDividerX: 430,
    rightDividerX: 750,
    dividerTopY: 52,
    dividerBottomY: 260 - 52,
    strokeDivider: 1,

    accentShapeX1: 1080 - 360,
    accentShapeX2: 1080 - 140,
    accentShapeX3: 1080 - 40,
    accentShapeX4: 1080 - 260,
    accentShapeOpacity: 0.07,

    leftColX: 48,
    leftTopY: 58,

    chartW: 340,
    chartH: 96,
    radiusPanel: 14,

    chartPad: 14,
    chartStroke: 2.6,

    gridLines: 4,
    gridOpacity: 0.55,

    chartFillOpacityTop: 0.22,
    chartFillOpacityBottom: 0,
    chartLabelFontSize: 11,
    chartLabelLeftText: "Last 30 days",
    chartLabelRightPrefix: "max ",
    chartLabelBottomPad: 1,
    chartMaxLabelY: 18,

    metricsY: 134,

    totalFontSize: 30,
    totalFontWeight: 800,
    totalLabelX: 104,
    totalLabelText: "Total contributions",
    totalLabelFontSize: 14,
    totalLabelFontWeight: 600,

    lastActiveRowY: 30,
    lastActiveLabelText: "Last active",
    lastActiveLabelFontSize: 12,
    lastActiveValueX: 74,
    lastActiveValueFontSize: 12,
    lastActiveValueFontWeight: 650,

    ringCenterY: 118,
    ringYOffset: -10,
    ringR: 52,
    ringStroke: 10,

    ringValueDy: 16,
    ringValueFontSize: 40,
    ringValueFontWeight: 850,

    streakTitleDy: 74,
    streakTitleFontSize: 14,
    streakTitleFontWeight: 400,

    streakDescDy: 94,
    streakDescFontSize: 12,
    streakDescFontWeight: 400,

    listXPad: 28,
    listY: 66,
    listRowH: 32,

    listIconBox: 20,
    listIconDy: -15,
    listIconOpacity: 0.95,
    listIconStroke: 2,

    listLabelX: 30,
    listValueX: 186,
    listFontSize: 14.5,
    listLabelWeight: 650,
    listValueWeight: 850,
  },
};
