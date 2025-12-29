export type Theme = {
  name: string;
  colors: {
    bgStops: [string, string];
    cardStroke: string;
    divider: string;
    panelBg: string;
    panelStroke: string;

    textStrong: string;
    textMuted: string;
    textDim: string;

    accentStops: [string, string, string];
    chartFill: string;

    listLabel: string;
    listValue: string;
    listIcon: string;
  };
  layout: {
    radiusCard: number;
    radiusPanel: number;

    strokeCard: number;
    strokeDivider: number;

    ringR: number;
    ringStroke: number;
    ringYOffset: number;

    chartPad: number;
    chartStroke: number;
    gridLines: number;

    leftTopY: number;
    metricsY: number;

    listXPad: number;
    listY: number;
    listRowH: number;

    totalFontSize: number;
    totalLabelX: number;
  };
};
