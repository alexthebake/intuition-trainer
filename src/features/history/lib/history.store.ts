import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { GameStats } from "@@/game/lib/game.types";
import { useMemo } from "react";
import { round } from "lodash";

export type GameHistoryEntry = {
  id: string;
  timestamp: Date;
  stats: GameStats;
};

export type HistoryStoreState = {
  history: GameHistoryEntry[];
};

const store = createStore<HistoryStoreState>()(
  persist<HistoryStoreState>(
    () => ({
      history: [],
    }),
    {
      name: "esp-trainer-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function useHistoryStore<U = HistoryStoreState>(
  fn: (state: HistoryStoreState) => U = (state) => state as U
) {
  return useStore(store, fn);
}

function useDerivedStats() {
  const history = useHistoryStore((state) => state.history);
  return useMemo(() => calculateDerivedStats(history), [history]);
}

function calculateDerivedStats(history: GameHistoryEntry[]) {
  if (history.length === 0) {
    return {
      totalGamesPlayed: 0,
      bestScore: 0,
      averageScore: 0,
      medianScore: 0,
      averageGameTime: 0,
      averageTurnTimeAcrossGames: 0,
    };
  }

  const scores = history.map((entry) => entry.stats.score);
  const bestScore = Math.max(...scores);
  const averageScore =
    scores.reduce((sum, score) => sum + score, 0) / scores.length;

  // Calculate median properly for both odd and even length arrays
  const sortedScores = [...scores].sort((a, b) => a - b);
  const medianScore =
    sortedScores.length % 2 === 1
      ? sortedScores[Math.floor(sortedScores.length / 2)]
      : (sortedScores[sortedScores.length / 2 - 1] +
          sortedScores[sortedScores.length / 2]) /
        2;

  // Calculate average game time
  const gamesWithTime = history.filter(
    (entry) => entry.stats.totalGameTime !== undefined
  );
  const averageGameTime =
    gamesWithTime.length > 0
      ? gamesWithTime.reduce(
          (sum, entry) => sum + (entry.stats.totalGameTime || 0),
          0
        ) / gamesWithTime.length
      : 0;

  // Calculate average turn time across all games
  const gamesWithTurnTime = history.filter(
    (entry) => entry.stats.averageTurnTime !== undefined
  );
  const averageTurnTimeAcrossGames =
    gamesWithTurnTime.length > 0
      ? gamesWithTurnTime.reduce(
          (sum, entry) => sum + (entry.stats.averageTurnTime || 0),
          0
        ) / gamesWithTurnTime.length
      : 0;

  return {
    totalGamesPlayed: history.length,
    bestScore,
    averageScore: round(averageScore / 100, 2),
    medianScore,
    averageGameTime: round(averageGameTime / 1000, 2),
    averageTurnTimeAcrossGames: round(averageTurnTimeAcrossGames / 1000, 2),
  };
}

// Actions
const saveGameResult = (stats: GameStats) => {
  const entry: GameHistoryEntry = {
    id: `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    stats: { ...stats },
  };

  store.setState((state) => {
    const newHistory = [...state.history, entry];
    const derivedStats = calculateDerivedStats(newHistory);

    return {
      history: newHistory,
      lastGameStats: stats,
      ...derivedStats,
    };
  });
};

const clearHistory = () => {
  store.setState({ history: [] });
};

const getRecentGames = (count: number = 10) => {
  const { history } = store.getState();
  return history.slice(-count).reverse(); // Most recent first
};

const getTopScores = (count: number = 10) => {
  const { history } = store.getState();
  return [...history]
    .sort((a, b) => b.stats.score - a.stats.score)
    .slice(0, count);
};

const getGameById = (id: string) => {
  const { history } = store.getState();
  return history.find((entry) => entry.id === id);
};

const exportHistoryAsJSON = () => {
  const state = store.getState();
  const derivedStats = calculateDerivedStats(state.history);
  const exportData = {
    exportDate: new Date().toISOString(),
    history: state.history,
    ...derivedStats,
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `esp-trainer-history-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const historyStore = {
  store,
  use: useHistoryStore,
  useDerivedStats,
  actions: {
    saveGameResult,
    clearHistory,
    getRecentGames,
    getTopScores,
    getGameById,
    exportHistoryAsJSON,
  },
};
