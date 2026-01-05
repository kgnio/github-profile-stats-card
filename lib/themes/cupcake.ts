import type { Theme } from "@/types/theme";

export const cupcakeTheme: Theme = {
  name: "cupcake",

  colors: {
    bgStops: ["#FFF8FC", "#FFEFF8"],

    cardStroke: "#F4C7DD",
    divider: "#F4C7DD",
    panelBg: "#FFFFFF",
    panelStroke: "#F4C7DD",

    textStrong: "#2A1A23",
    textMuted: "#8B5B72",
    textDim: "#B07A93",

    accentStops: ["#FDA4AF", "#C4B5FD", "#FCD34D"],
    chartFill: "#FDA4AF",

    listLabel: "#E11D7B",
    listValue: "#A31555",
    listIcon: "#E11D7B",

    shadowColor: "#000000",
  },

  layout: {
    /* ================= GLOBAL ================= */
    fontFamily:
      '"Comic Sans MS","Trebuchet MS","Segoe UI",system-ui,-apple-system,Roboto,Helvetica,Arial,sans-serif',

    cardW: 1080,
    cardH: 260,
    cardPad: 14,

    /* ================= FRAME ================= */
    radiusCard: 28,
    strokeCard: 1,
    shadowDx: 0,
    shadowDy: 10,
    shadowBlur: 16,
    shadowOpacity: 0.1,

    /* ================= DIVIDERS ================= */
    leftDividerX: 430,
    rightDividerX: 750,
    dividerTopY: 52,
    dividerBottomY: 52,
    strokeDivider: 1,

    dividerStyle: "dashed",
    dividerDash: "3 7",

    /* ================= ACCENT SHAPE ================= */
    accentShapeVariant: "diagonal",
    accentShapeX1: 360,
    accentShapeX2: 140,
    accentShapeX3: 40,
    accentShapeX4: 260,
    accentShapeOpacity: 0.04,

    /* ================= LEFT COLUMN ================= */
    leftColX: 48,
    leftTopY: 58,

    /* ================= CHART ================= */
    chartW: 340,
    chartH: 96,
    radiusPanel: 18,

    chartPad: 14,
    chartStroke: 2.4,

    chartVariant: "bars",
    chartGrid: false,
    chartLineDash: undefined,

    chartBarGap: 4,
    chartBarRadius: 8,
    chartDotR: undefined,

    gridLines: 4,
    gridOpacity: 0.55,

    chartFillOpacityTop: 0.18,
    chartFillOpacityBottom: 0,

    chartLabelFontSize: 11,
    chartLabelLeftText: "Last 30 days",
    chartLabelRightPrefix: "max",
    chartLabelBottomPad: 3,
    chartMaxLabelY: 18,

    /* ================= METRICS ================= */
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

    /* ================= RING ================= */
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

    /* ================= RIGHT LIST ================= */
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
