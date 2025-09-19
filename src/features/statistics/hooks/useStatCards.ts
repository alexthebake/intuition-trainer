import { useMemo } from "react";

import { historyStore } from "@@/history";
import { TimePeriod } from "@@/statistics/statistics.types";

export const useStatCards = (selectedPeriod: TimePeriod) => {
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

  // Calculate statistics for cards
  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        bestScore: 0,
        averageScore: 0,
        medianScore: 0,
        totalGames: 0,
        averageGameTime: 0,
        averageTurnTime: 0,
      };
    }

    const scores = filteredData.map((entry) => entry.stats.score);
    const bestScore = Math.max(...scores);
    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    const medianScore = scores.sort((a, b) => a - b)[
      Math.ceil(scores.length / 2)
    ];
    // Calculate timing statistics
    const gamesWithTime = filteredData.filter(
      (entry) => entry.stats.totalGameTime !== undefined
    );
    const averageGameTime =
      gamesWithTime.length > 0
        ? gamesWithTime.reduce(
            (sum, entry) => sum + (entry.stats.totalGameTime || 0),
            0
          ) / gamesWithTime.length
        : 0;

    const gamesWithTurnTime = filteredData.filter(
      (entry) => entry.stats.averageTurnTime !== undefined
    );
    const averageTurnTime =
      gamesWithTurnTime.length > 0
        ? gamesWithTurnTime.reduce(
            (sum, entry) => sum + (entry.stats.averageTurnTime || 0),
            0
          ) / gamesWithTurnTime.length
        : 0;

    return {
      bestScore,
      averageScore: Math.round(averageScore * 100) / 100,
      medianScore,
      totalGames: filteredData.length,
      averageGameTime: Math.round(averageGameTime / 1000), // Convert to seconds
      averageTurnTime: Math.round((averageTurnTime / 1000) * 10) / 10, // Convert to seconds with 1 decimal
    };
  }, [filteredData]);

  return stats;
};
