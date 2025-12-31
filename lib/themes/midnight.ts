import type { Theme } from "@/types/theme";

export const midnightTheme: Theme = {
  name: "midnight",

  colors: {
    bgStops: ["#070B14", "#0B1220"],
    cardStroke: "#1F2937",
    divider: "#1F2937",
    panelBg: "#0A0F1A",
    panelStroke: "#1F2937",

    textStrong: "#E5E7EB",
    textMuted: "#9CA3AF",
    textDim: "#6B7280",

    accentStops: ["#60A5FA", "#A78BFA", "#34D399"],
    chartFill: "#60A5FA",

    listLabel: "#22C55E",
    listValue: "#86EFAC",
    listIcon: "#22C55E",

    shadowColor: "#000000",
  },

  layout: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",

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
    dividerBottomY: 52,
    strokeDivider: 1,

    dividerStyle: "solid",
    dividerDash: "",

    accentShapeVariant: "diagonal",
    accentShapeX1: 360,
    accentShapeX2: 140,
    accentShapeX3: 40,
    accentShapeX4: 260,
    accentShapeOpacity: 0.07,

    leftColX: 48,
    leftTopY: 58,

    chartW: 340,
    chartH: 96,
    radiusPanel: 14,

    chartPad: 14,
    chartStroke: 2.6,

    chartVariant: "area",
    chartGrid: true,
    chartLineDash: undefined,

    chartDotR: 0,
    chartBarGap: 0,
    chartBarRadius: 0,

    gridLines: 4,
    gridOpacity: 0.55,

    chartFillOpacityTop: 0.22,
    chartFillOpacityBottom: 0,

    chartLabelFontSize: 11,
    chartLabelLeftText: "Last 30 days",
    chartLabelRightPrefix: "max",
    chartLabelBottomPad: 3,
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

    streakTitleDy: 82,
    streakTitleFontSize: 14,
    streakTitleFontWeight: 400,

    streakDescDy: 102,
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
