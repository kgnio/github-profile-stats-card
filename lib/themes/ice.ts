import type { Theme } from "@/types/theme";

export const iceTheme: Theme = {
  name: "ice",

  colors: {
    // icy glass background
    bgStops: ["#F6FBFF", "#EAF5FF"],
    cardStroke: "#BFD7EA",
    divider: "#BFD7EA",
    panelBg: "#FFFFFF",
    panelStroke: "#BFD7EA",

    textStrong: "#0B1F33",
    textMuted: "#3B637E",
    textDim: "#6C8FA7",

    // cold accents (cyan → blue → lilac)
    accentStops: ["#22D3EE", "#60A5FA", "#A5B4FC"],
    chartFill: "#38BDF8",

    // right list (cool + readable)
    listLabel: "#0EA5E9",
    listValue: "#0B4A6E",
    listIcon: "#0EA5E9",

    shadowColor: "#000000",
  },

  layout: {
    /* ================= GLOBAL ================= */
    fontFamily:
      '"Inter","Plus Jakarta Sans","Segoe UI",ui-sans-serif,system-ui,-apple-system,Roboto',

    cardW: 1080,
    cardH: 260,
    cardPad: 14,

    /* ================= FRAME ================= */
    radiusCard: 22,
    strokeCard: 1,

    shadowDx: 0,
    shadowDy: 10,
    shadowBlur: 18,
    shadowOpacity: 0.12,

    /* ================= DIVIDERS ================= */
    leftDividerX: 430,
    rightDividerX: 750,
    dividerTopY: 52,
    dividerBottomY: 52,
    strokeDivider: 1,

    dividerStyle: "dashed",
    dividerDash: "2 8",

    /* ================= ACCENT SHAPE ================= */
    // ice: soft wave accent
    accentShapeVariant: "wave",
    accentShapeX1: 360,
    accentShapeX2: 140,
    accentShapeX3: 40,
    accentShapeX4: 260,
    accentShapeOpacity: 0.06,

    /* ================= LEFT COLUMN ================= */
    leftColX: 48,
    leftTopY: 58,

    /* ================= CHART ================= */
    chartW: 340,
    chartH: 96,
    radiusPanel: 16,

    chartPad: 14,
    chartStroke: 2.4,

    chartVariant: "dots",
    chartGrid: true,
    chartLineDash: undefined,

    chartDotR: 3,
    chartBarGap: 0,
    chartBarRadius: 0,

    gridLines: 4,
    gridOpacity: 0.45,

    chartFillOpacityTop: 0.16,
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
    listIconOpacity: 0.9,
    listIconStroke: 2,

    listLabelX: 30,
    listValueX: 186,
    listFontSize: 14.5,
    listLabelWeight: 650,
    listValueWeight: 850,
  },
};
