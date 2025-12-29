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
  },
  layout: {
    radiusCard: 20,
    radiusPanel: 14,
    strokeCard: 1,
    strokeDivider: 1,

    ringR: 52,
    ringStroke: 10,
    ringYOffset: -10,

    chartPad: 12,
    chartStroke: 2.6,
    gridLines: 4,

    leftTopY: 58,
    metricsY: 134,

    listXPad: 28,
    listY: 66,
    listRowH: 32,

    totalFontSize: 30,
    totalLabelX: 104,
  },
};
