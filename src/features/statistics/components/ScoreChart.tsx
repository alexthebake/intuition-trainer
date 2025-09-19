import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryClipContainer,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";

import { styled } from "@/styles/jsx";
import { createCustomTheme } from "@@/statistics/components/ChartHelpers";
import { useScoreChart } from "@@/statistics/hooks/useScoreChart";

import { WithCss } from "@/styles/types";
import { useIsDarkMode } from "@@/theme";
import { round } from "lodash";

export type ScoreChartProps = WithCss;

export const ScoreChart: React.FC<ScoreChartProps> = ({ css }) => {
  const isDark = useIsDarkMode();

  const { lineChartData, barChartData, trendLineData } = useScoreChart();

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
        Score Over Time & Game Duration
      </styled.h3>
      <styled.p fontSize="sm" color="text.muted">
        Shows your scores over time and each game's duration.
      </styled.p>
      <styled.div
        display="flex"
        alignItems="center"
        gap="4"
        mt="2"
        fontSize="xs"
        color="text.muted"
        flexWrap="wrap"
      >
        <styled.div display="flex" alignItems="center" gap="1">
          <styled.span w="2" h="2" bg="stats.score.datum" rounded="xs" />
          <styled.span fontWeight="bold">Score</styled.span>
        </styled.div>

        <styled.div display="flex" alignItems="center" gap="1">
          <styled.span
            position="relative"
            w="4"
            h="3"
            bg="transparent"
            rounded="xs"
            overflow="hidden"
          >
            <styled.span
              position="absolute"
              top="50%"
              left="0%"
              w="full"
              h="1px"
              borderTop="2px dashed"
              borderTopColor="stats.score.trendline"
            />
          </styled.span>
          <styled.span fontWeight="bold">Trend line</styled.span>
        </styled.div>

        <styled.div display="flex" alignItems="center" gap="1">
          <styled.span w="2" h="2" bg="stats.duration.datum" rounded="xs" />
          <styled.span fontWeight="bold">Game duration</styled.span>
        </styled.div>
      </styled.div>
      <VictoryChart
        theme={createCustomTheme(isDark)}
        width={600}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => {
              if (datum.childName === "game-time") {
                return `Duration: ${round(datum.y, 2)}s`;
              }
              if (datum.childName === "score-points") {
                return `Score: ${round(datum.y, 2)} points`;
              }
              if (datum.childName === "trend-line") {
                return `Avg: ${round(datum.y, 2)} points`;
              }
              return "---";
            }}
            labelComponent={<VictoryTooltip />}
            responsive
          />
        }
        padding={{ left: 60, right: 40, top: 40, bottom: 80 }}
      >
        <VictoryAxis
          tickValues={[0, 6, 12, 18, 24]}
          dependentAxis
          label="Score / Normalized Time"
          style={{
            parent: {
              paddingRight: "20rem",
            },
          }}
        />
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
            name="game-time"
            data={barChartData}
            style={{
              data: {
                fill: "var(--colors-stats-duration-datum)",
                fillOpacity: 0.4,
                strokeWidth: 0,
              },
            }}
            groupComponent={
              <VictoryClipContainer
                clipPadding={{ left: 0, right: 0, top: 0, bottom: 0 }}
              />
            }
          />
        )}

        {/* Trend line for scores */}
        {trendLineData.length > 0 && (
          <VictoryLine
            name="trend-line"
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
          name="score-points"
          data={lineChartData}
          style={{
            data: {
              fill: "var(--colors-stats-score-datum)",
            },
          }}
        />

        <VictoryLine
          name="score-line"
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
