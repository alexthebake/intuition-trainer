import React from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryHistogram,
  VictoryTooltip,
} from "victory";

import { pluralize } from "@/lib/pluralize";
import { styled } from "@/styles/jsx";
import { WithCss } from "@/styles/types";
import { createCustomTheme } from "@@/statistics/components/ChartHelpers";
import { useScoreDistribution } from "@@/statistics/hooks/useScoreDistribution";
import { useIsDarkMode } from "@@/theme";

export type ScoreDistributionChartProps = WithCss;

export const ScoreDistributionChart: React.FC<ScoreDistributionChartProps> = ({
  css,
}) => {
  const isDark = useIsDarkMode();

  const { histogramData } = useScoreDistribution();

  return (
    <styled.div
      display="flex"
      flexDirection="column"
      bg="stats.card.bg"
      p={4}
      rounded="lg"
      border="1px solid"
      borderColor="stats.card.border"
      css={css}
    >
      <styled.h3
        fontSize="lg"
        fontWeight="semibold"
        color={{ base: "gray.900", _dark: "gray.100" }}
      >
        Score Distribution
      </styled.h3>
      <styled.p fontSize="sm" color="text.muted">
        Shows the distribution of scores for all games played.
      </styled.p>
      <VictoryChart
        theme={createCustomTheme(isDark)}
        width={600}
        containerComponent={<VictoryContainer responsive />}
        padding={{ left: 60, right: 40, top: 40, bottom: 60 }}
      >
        <VictoryAxis dependentAxis label="Frequency" />
        <VictoryAxis
          label="Score"
          tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]}
          domain={[0, 24]}
        />
        <VictoryHistogram
          data={histogramData}
          x="score"
          bins={25}
          style={{
            data: {
              fill: "var(--colors-stats-score-datum)",
              fillOpacity: 0.5,
              stroke: "var(--colors-stats-score-datum)",
              strokeWidth: 1,
            },
          }}
          labels={({ datum }) => {
            const score = datum.binnedData[0].score;
            return `${datum.y} ${pluralize(datum.y, "game")} at ${score} points`;
          }}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </styled.div>
  );
};
