import type { Theme } from "@/types/theme";

export const cupcakeTheme: Theme = {
  name: "cupcake",
  colors: {
    bgStops: ["#FDF2F8", "#EEF2FF"],
    cardStroke: "#E5E7EB",
    divider: "#E5E7EB",
    panelBg: "#FFFFFF",
    panelStroke: "#E5E7EB",

    textStrong: "#0F172A",
    textMuted: "#475569",
    textDim: "#64748B",

    accentStops: ["#FDA4AF", "#F9A8D4", "#C4B5FD"],
    chartFill: "#FDA4AF",

    listLabel: "#DB2777",
    listValue: "#0F172A",
    listIcon: "#DB2777",
  },
  layout: {
    radiusCard: 26,
    radiusPanel: 18,
    strokeCard: 1,
    strokeDivider: 1,

    ringR: 52,
    ringStroke: 8,
    ringYOffset: -10,

    chartPad: 12,
    chartStroke: 2.2,
    gridLines: 3,

    leftTopY: 58,
    metricsY: 140,

    listXPad: 28,
    listY: 62,
    listRowH: 34,

    totalFontSize: 30,
    totalLabelX: 104,
  },
};
