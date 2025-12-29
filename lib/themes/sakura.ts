import type { Theme } from "@/types/theme";

export const sakuraTheme: Theme = {
  name: "sakura",
  colors: {
    bgStops: ["#2A1623", "#1A2142"],
    cardStroke: "#5A3A55",
    divider: "#5A3A55",
    panelBg: "#2B1726",
    panelStroke: "#5A3A55",

    textStrong: "#FFF7FB",
    textMuted: "#F3C6DD",
    textDim: "#C79AB5",

    accentStops: ["#FDA4AF", "#F9A8D4", "#C4B5FD"],
    chartFill: "#FDA4AF",

    listLabel: "#F9A8D4",
    listValue: "#FCE7F3",
    listIcon: "#F9A8D4",
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
