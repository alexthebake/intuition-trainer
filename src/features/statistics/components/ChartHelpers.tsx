import { VictoryTheme, VictoryThemeDefinition } from "victory";

// Custom Victory theme for dark mode support
export const createCustomTheme = (isDark: boolean): VictoryThemeDefinition => {
  const baseTheme = VictoryTheme.material;

  return {
    ...baseTheme,
    axis: {
      ...baseTheme.axis,
      style: {
        ...baseTheme.axis?.style,
        axis: {
          stroke: isDark ? "var(--colors-gray-500)" : "var(--colors-gray-200)", // Dimmed grid lines
          strokeWidth: 1,
        },
        grid: {
          stroke: isDark ? "var(--colors-gray-600)" : "var(--colors-gray-400)", // Very subtle grid lines
          strokeWidth: 0.5,
          strokeDasharray: "2,2",
        },
        tickLabels: {
          fill: isDark ? "var(--colors-gray-400)" : "var(--colors-gray-600)", // Readable tick labels
          fontSize: 12,
          fontFamily: "inherit",
        },
        axisLabel: {
          fill: isDark ? "var(--colors-gray-200)" : "var(--colors-gray-800)", // Readable axis labels
          fontSize: 14,
          fontFamily: "inherit",
          padding: 40,
        },
      },
    },
  };
};
