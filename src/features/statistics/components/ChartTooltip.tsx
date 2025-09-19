import isNil from "lodash/isNil";
import React, { forwardRef } from "react";
import { VictoryTooltip } from "victory";

export type ChartTooltipProps = {
  datum?: {
    x: number;
    y: number;
    gameNumber: string | number;
    timestamp: Date | string;
    gameDuration?: number | null;
    actualTime?: number;
    gameCount?: number;
  };
  isDark: boolean;
};

export const ChartTooltip: React.FC<ChartTooltipProps> = forwardRef<
  VictoryTooltip,
  ChartTooltipProps
>(({ datum, isDark }, ref) => {
  if (!datum) return null;

  const lines = [];

  lines.push(`Game ${datum.gameNumber}`);
  lines.push(`Time: ${formatTimestamp(datum.timestamp)}`);
  lines.push(`Score: ${datum.y} points`);

  if (!isNil(datum.gameDuration)) {
    lines.push(`Duration: ${datum.gameDuration}s`);
  } else if (!isNil(datum.actualTime)) {
    lines.push(`Duration: ${datum.actualTime}s`);
  }

  return (
    <VictoryTooltip
      ref={ref}
      datum={datum}
      text={lines}
      style={{
        fill: isDark ? "var(--colors-gray-800)" : "var(--colors-gray-100)",
        fontSize: 12,
      }}
      flyoutStyle={{
        stroke: isDark ? "var(--colors-gray-600)" : "var(--colors-gray-200)",
        strokeWidth: 1,
        fill: isDark ? "var(--colors-gray-800)" : "var(--colors-gray-100)",
      }}
    />
  );
});

// Helpers

const formatTimestamp = (timestamp: Date | string) => {
  const date = new Date(timestamp);

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
