import { round } from "lodash";
import { useMemo } from "react";

import { historyStore } from "@@/history";

export const useScoreChart = () => {
  const history = historyStore.use(({ history }) => history);

  // Prepare data for line chart (score over time)
  const lineChartData = useMemo(() => {
    return history.map((entry, index) => ({
      x: index + 1,
      y: entry.stats.score,
      gameNumber: index + 1,
      timestamp: entry.timestamp,
      gameDuration: entry.stats.totalGameTime
        ? round(entry.stats.totalGameTime / 1000, 2)
        : null,
    }));
  }, [history]);

  // Prepare data for bar chart (game time) - normalize to score scale (0-24)
  const barChartData = useMemo(() => {
    const gamesWithTime = history.filter(
      (entry) => entry.stats.totalGameTime !== undefined
    );

    if (gamesWithTime.length === 0) return [];

    const timesInSeconds = gamesWithTime.map((entry) =>
      round((entry.stats.totalGameTime || 0) / 1000, 2)
    );

    const maxTime = Math.max(...timesInSeconds);
    const minTime = Math.min(...timesInSeconds);

    return gamesWithTime.map((entry) => {
      const timeInSeconds = round((entry.stats.totalGameTime || 0) / 1000, 2);
      // Normalize to 0-24 scale for better visualization alongside scores
      const normalizedTime =
        maxTime > minTime
          ? ((timeInSeconds - minTime) / (maxTime - minTime)) * 24
          : 12; // Default to middle if all times are the same

      // Find the game number in the original filtered data
      const gameNumber = history.findIndex((e) => e.id === entry.id) + 1;

      return {
        x: gameNumber,
        y: normalizedTime,
        actualTime: timeInSeconds,
        gameNumber,
        timestamp: entry.timestamp,
      };
    });
  }, [history]);

  // Calculate trend line for processed data
  const trendLineData = useMemo(() => {
    if (lineChartData.length < 2) return [];

    const n = lineChartData.length;
    const sumX = lineChartData.reduce((sum, point) => sum + point.x, 0);
    const sumY = lineChartData.reduce((sum, point) => sum + point.y, 0);
    const sumXY = lineChartData.reduce(
      (sum, point) => sum + point.x * point.y,
      0
    );
    const sumXX = lineChartData.reduce(
      (sum, point) => sum + point.x * point.x,
      0
    );

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const firstTimestamp = Math.min(...lineChartData.map((point) => point.x));
    const lastTimestamp = Math.max(...lineChartData.map((point) => point.x));

    return [
      { x: firstTimestamp, y: intercept + slope * firstTimestamp },
      { x: lastTimestamp, y: intercept + slope * lastTimestamp },
    ];
  }, [lineChartData]);

  return {
    history,
    lineChartData,
    barChartData,
    trendLineData,
  };
};
