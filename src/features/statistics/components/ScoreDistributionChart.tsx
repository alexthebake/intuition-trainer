import React from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryHistogram,
} from "victory";

import { styled } from "@/styles/jsx";
import { createCustomTheme } from "@@/statistics/components/ChartHelpers";
import { useScoreDistribution } from "@@/statistics/hooks/useScoreDistribution";
import { TimePeriod } from "@@/statistics/statistics.types";
import { useIsDarkMode } from "@@/theme";
import { WithCss } from "@/styles/types";

export type ScoreDistributionChartProps = {
  selectedPeriod: TimePeriod;
} & WithCss;

export const ScoreDistributionChart: React.FC<ScoreDistributionChartProps> = ({
  selectedPeriod,
  css,
}) => {
  const isDark = useIsDarkMode();

  const { histogramData } = useScoreDistribution(selectedPeriod);

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
        mb={4}
        color={{ base: "gray.900", _dark: "gray.100" }}
      >
        Score Distribution
      </styled.h3>
      <VictoryChart
        theme={createCustomTheme(isDark)}
        height={300}
        width={600}
        containerComponent={<VictoryContainer responsive={true} />}
        padding={{ left: 60, right: 40, top: 40, bottom: 60 }}
      >
        <VictoryAxis dependentAxis label="Frequency" />
        <VictoryAxis
          label="Score"
          tickValues={[0, 4, 8, 12, 16, 20, 24]}
          domain={[0, 24]}
        />
        <VictoryHistogram
          data={histogramData}
          x="score"
          bins={25} // 25 bins for scores 0-24 (one bin per score)
          domain={{ x: [0, 24] }}
          binSpacing={4}
          style={{
            data: {
              fill: "var(--colors-stats-score-datum)",
              fillOpacity: 0.5,
              stroke: "var(--colors-stats-score-datum)",
              strokeWidth: 1,
            },
          }}
        />
      </VictoryChart>
    </styled.div>
  );
};
