import type { Theme } from "@/types/theme";

export const pineTreeTheme: Theme = {
  name: "pine-tree",

  colors: {
    bgStops: ["#F2FBF4", "#EFE6D7"],

    cardStroke: "#B69B78",
    divider: "#B69B78",
    panelBg: "#FBF8F3",
    panelStroke: "#C3A382",

    textStrong: "#142017",
    textMuted: "#2E3C33",
    textDim: "#55665B",

    accentStops: ["#1F8A4C", "#6D28D9", "#9A7B4F"],
    chartFill: "#1F8A4C",

    listLabel: "#1F8A4C",
    listValue: "#1F2A23",
    listIcon: "#6D28D9",

    shadowColor: "#000000",
  },

  layout: {
    fontFamily:
      '"Tahoma","Verdana","Segoe UI",system-ui,-apple-system,Roboto,Helvetica,Arial,sans-serif',

    cardW: 1080,
    cardH: 260,
    cardPad: 14,

    radiusCard: 22,
    strokeCard: 1,

    shadowDx: 0,
    shadowDy: 10,
    shadowBlur: 18,
    shadowOpacity: 0.12,

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
    accentShapeOpacity: 0.08,

    leftColX: 48,
    leftTopY: 58,

    chartW: 340,
    chartH: 96,
    radiusPanel: 16,

    chartPad: 14,
    chartStroke: 2.4,

    chartVariant: "forest",
    chartGrid: true,
    chartLineDash: undefined,

    chartDotR: 3.2,
    chartBarGap: 0,
    chartBarRadius: 9,

    gridLines: 4,
    gridOpacity: 0.66,

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
