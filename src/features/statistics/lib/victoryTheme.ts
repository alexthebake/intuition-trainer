import { VictoryTheme, VictoryThemeDefinition } from "victory";

const baseTheme = VictoryTheme.material;

export const victoryTheme: VictoryThemeDefinition = {
  ...baseTheme,
  axis: {
    ...baseTheme.axis,
    style: {
      ...baseTheme.axis?.style,
      axis: {
        stroke: "var(--colors-chart-axis-stroke)",
        strokeWidth: 1,
      },
      axisLabel: {
        fill: "var(--colors-chart-axis-label)",
        fontSize: 14,
        fontFamily: "inherit",
        padding: 40,
      },
      grid: {
        stroke: "var(--colors-chart-grid-stroke)",
        strokeWidth: 0.5,
        strokeDasharray: "2,2",
      },
      tickLabels: {
        fill: "var(--colors-chart-axis-tick-labels)",
        fontSize: 12,
        fontFamily: "inherit",
      },
    },
  },
};
