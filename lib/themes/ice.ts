import type { Theme } from "@/types/theme";

export const iceTheme: Theme = {
  name: "ice",
  colors: {
    bgStops: ["#F8FAFC", "#EFF6FF"],
    cardStroke: "#E2E8F0",
    divider: "#E2E8F0",
    panelBg: "#FFFFFF",
    panelStroke: "#E2E8F0",

    textStrong: "#0F172A",
    textMuted: "#334155",
    textDim: "#64748B",

    accentStops: ["#FB7185", "#F472B6", "#93C5FD"],
    chartFill: "#93C5FD",

    listLabel: "#0EA5E9",
    listValue: "#0F172A",
    listIcon: "#0EA5E9",
  },
  layout: {
    radiusCard: 22,
    radiusPanel: 16,
    strokeCard: 1,
    strokeDivider: 1,

    ringR: 52,
    ringStroke: 9,
    ringYOffset: -10,

    chartPad: 12,
    chartStroke: 2.4,
    gridLines: 4,

    leftTopY: 58,
    metricsY: 138,

    listXPad: 28,
    listY: 66,
    listRowH: 32,

    totalFontSize: 30,
    totalLabelX: 104,
  },
};
