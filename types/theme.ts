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

    shadowColor: string;
  };

  layout: {
    fontFamily: string;

    cardW: number;
    cardH: number;
    cardPad: number;

    radiusCard: number;
    strokeCard: number;

    shadowDx: number;
    shadowDy: number;
    shadowBlur: number;
    shadowOpacity: number;

    leftDividerX: number;
    rightDividerX: number;
    dividerTopY: number;
    dividerBottomY: number;
    strokeDivider: number;

    dividerStyle: "solid" | "dashed" | "none";
    dividerDash?: string;

    accentShapeVariant: "diagonal" | "wave" | "blob" | "none";
    accentShapeX1: number;
    accentShapeX2: number;
    accentShapeX3: number;
    accentShapeX4: number;
    accentShapeOpacity: number;

    leftColX: number;
    leftTopY: number;

    chartW: number;
    chartH: number;
    radiusPanel: number;

    chartPad: number;
    chartStroke: number;

    chartVariant:
      | "area"
      | "bars"
      | "dots"
      | "spark"
      | "sparkbars"
      | "steps"
      | "lollipop"
      | "needle"
      | "peaks"
      | "sparkareaThin";
    chartGrid: boolean;
    chartLineDash?: string;

    chartDotR?: number;
    chartBarGap?: number;
    chartBarRadius?: number;

    gridLines: number;
    gridOpacity: number;

    chartFillOpacityTop: number;
    chartFillOpacityBottom: number;

    chartLabelFontSize: number;
    chartLabelLeftText: string;
    chartLabelRightPrefix: string;
    chartLabelBottomPad: number;
    chartMaxLabelY: number;

    metricsY: number;

    totalFontSize: number;
    totalFontWeight: number;
    totalLabelX: number;
    totalLabelText: string;
    totalLabelFontSize: number;
    totalLabelFontWeight: number;

    lastActiveRowY: number;
    lastActiveLabelText: string;
    lastActiveLabelFontSize: number;
    lastActiveValueX: number;
    lastActiveValueFontSize: number;
    lastActiveValueFontWeight: number;

    ringCenterY: number;
    ringYOffset: number;
    ringR: number;
    ringStroke: number;

    ringValueDy: number;
    ringValueFontSize: number;
    ringValueFontWeight: number;

    streakTitleDy: number;
    streakTitleFontSize: number;
    streakTitleFontWeight: number;

    streakDescDy: number;
    streakDescFontSize: number;
    streakDescFontWeight: number;

    listXPad: number;
    listY: number;
    listRowH: number;

    listIconBox: number;
    listIconDy: number;
    listIconOpacity: number;
    listIconStroke: number;

    listLabelX: number;
    listValueX: number;
    listFontSize: number;
    listLabelWeight: number;
    listValueWeight: number;
  };
};
