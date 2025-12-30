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

    // NEW: shadow rengi tema üzerinden
    shadowColor: string;
  };

  layout: {
    // NEW: global
    fontFamily: string;

    // NEW: card size/padding
    cardW: number;
    cardH: number;
    cardPad: number;

    // Card frame
    radiusCard: number;
    strokeCard: number;

    // NEW: shadow controls
    shadowDx: number;
    shadowDy: number;
    shadowBlur: number;
    shadowOpacity: number;

    // Dividers
    leftDividerX: number;
    rightDividerX: number;
    dividerTopY: number;
    dividerBottomY: number;
    strokeDivider: number;

    // NEW: accent shape geometry
    accentShapeX1: number;
    accentShapeX2: number;
    accentShapeX3: number;
    accentShapeX4: number;
    accentShapeOpacity: number;

    // Left column anchors
    leftColX: number;
    leftTopY: number;

    // Chart panel
    chartW: number;
    chartH: number;
    radiusPanel: number;

    chartPad: number;
    chartStroke: number;

    gridLines: number;
    gridOpacity: number;

    // NEW: chart fill & labels
    chartFillOpacityTop: number;
    chartFillOpacityBottom: number;
    chartLabelFontSize: number;
    chartLabelLeftText: string;
    chartLabelRightPrefix: string;
    chartLabelBottomPad: number;
    chartMaxLabelY: number;

    // Metrics (under chart)
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

    // Ring (middle)
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

    // Right list
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
