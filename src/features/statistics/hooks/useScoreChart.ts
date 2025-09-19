import { useMemo } from "react";

import { historyStore } from "@@/history";
import { TimePeriod } from "@@/statistics/statistics.types";

export const useScoreChart = (selectedPeriod: TimePeriod) => {
  const history = historyStore.use(({ history }) => history);

  // Filter data based on selected time period
  const filteredData = useMemo(() => {
    if (selectedPeriod === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return history.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime();
      });
    }
    return history;
  }, [history, selectedPeriod]);

  // Prepare data for line chart (score over time)
  const lineChartData = useMemo(() => {
    return filteredData.map((entry, index) => ({
      x: index + 1,
      y: entry.stats.score,
      gameNumber: index + 1,
      timestamp: entry.timestamp,
      gameDuration: entry.stats.totalGameTime
        ? Math.round(entry.stats.totalGameTime / 1000)
        : null,
    }));
  }, [filteredData]);

  // Prepare data for bar chart (game time) - normalize to score scale (0-24)
  const barChartData = useMemo(() => {
    const gamesWithTime = filteredData.filter(
      (entry) => entry.stats.totalGameTime !== undefined
    );

    if (gamesWithTime.length === 0) return [];

    const timesInSeconds = gamesWithTime.map((entry) =>
      Math.round((entry.stats.totalGameTime || 0) / 1000)
    );

    const maxTime = Math.max(...timesInSeconds);
    const minTime = Math.min(...timesInSeconds);

    return gamesWithTime.map((entry) => {
      const timeInSeconds = Math.round((entry.stats.totalGameTime || 0) / 1000);
      // Normalize to 0-24 scale for better visualization alongside scores
      const normalizedTime =
        maxTime > minTime
          ? ((timeInSeconds - minTime) / (maxTime - minTime)) * 24
          : 12; // Default to middle if all times are the same

      // Find the game number in the original filtered data
      const gameNumber = filteredData.findIndex((e) => e.id === entry.id) + 1;

      return {
        x: gameNumber,
        y: normalizedTime,
        actualTime: timeInSeconds,
        gameNumber,
        timestamp: entry.timestamp,
      };
    });
  }, [filteredData]);

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

  // Calculate domain for "Today" view - full 24 hours
  const todayDomain = useMemo(() => {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    return {
      x: [startOfDay.getTime(), endOfDay.getTime()] as [number, number],
      y: [0, 24] as [number, number],
    };
  }, []);

  return {
    filteredData,
    lineChartData,
    barChartData,
    trendLineData,
    todayDomain,
  };
};
