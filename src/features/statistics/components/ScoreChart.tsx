import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from "victory";

import { styled } from "@/styles/jsx";
import { createCustomTheme } from "@@/statistics/components/ChartHelpers";
import { ChartTooltip } from "@@/statistics/components/ChartTooltip";
import { useScoreChart } from "@@/statistics/hooks/useScoreChart";
import { TimePeriod } from "@@/statistics/statistics.types";
import { useIsDarkMode } from "@@/theme";
import { WithCss } from "@/styles/types";

export type ScoreChartProps = {
  selectedPeriod: TimePeriod;
} & WithCss;

export const ScoreChart: React.FC<ScoreChartProps> = ({
  selectedPeriod,
  css,
}) => {
  const isDark = useIsDarkMode();

  const { lineChartData, barChartData, trendLineData, todayDomain } =
    useScoreChart(selectedPeriod);

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
        Score Over Time & Game Duration
      </styled.h3>
      <styled.div fontSize="sm" color="text.secondary" mb={2}>
        Blue line/dots: Score (0-24) | Cyan bars: Game time (normalized scale,
        hover for actual seconds)
      </styled.div>
      <VictoryChart
        theme={createCustomTheme(isDark)}
        height={300}
        width={600}
        containerComponent={<VictoryContainer responsive />}
        domain={selectedPeriod === "today" ? todayDomain : undefined}
        padding={{ left: 60, right: 40, top: 40, bottom: 80 }}
      >
        <VictoryAxis dependentAxis label="Score / Normalized Time" />
        <VictoryAxis
          label={"Game Number"}
          tickFormat={(gameNumber) => gameNumber.toString()}
          style={{
            tickLabels: {
              angle: 0,
              textAnchor: "middle",
              fontSize: 10,
            },
          }}
        />

        {/* Game time bars */}
        {barChartData.length > 0 && (
          <VictoryBar
            data={barChartData}
            style={{
              data: {
                fill: "var(--colors-stats-duration-datum)",
                fillOpacity: 0.4,
                strokeWidth: 0,
              },
            }}
            labelComponent={<ChartTooltip isDark={isDark} />}
          />
        )}

        {/* Trend line for scores */}
        {trendLineData.length > 0 && (
          <VictoryLine
            data={trendLineData}
            style={{
              data: {
                stroke: "var(--colors-stats-score-trendline)",
                strokeWidth: 2,
                strokeDasharray: "5,5",
              },
            }}
          />
        )}

        {/* Score points and line */}
        <VictoryScatter
          data={lineChartData}
          style={{
            data: {
              fill: "var(--colors-stats-score-datum)",
            },
          }}
          labelComponent={<VictoryTooltip />}
        />

        <VictoryLine
          data={lineChartData}
          style={{
            data: {
              stroke: "var(--colors-stats-score-datum)",
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
    </styled.div>
  );
};
