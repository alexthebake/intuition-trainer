import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";

import { GameStats } from "@@/game/lib/game.types";

export type GameHistoryEntry = {
  id: string;
  timestamp: Date;
  stats: GameStats;
  duration?: number; // Optional: game duration in milliseconds
};

export type HistoryStoreState = {
  history: GameHistoryEntry[];
  totalGamesPlayed: number;
  bestScore: number;
  averageScore: number;
  medianScore: number;
  averageGameTime: number;
  averageTurnTimeAcrossGames: number;
  lastGameStats: GameStats | null;
};

const store = createStore<HistoryStoreState>()(
  persist<HistoryStoreState>(
    () => ({
      history: [],
      totalGamesPlayed: 0,
      bestScore: 0,
      averageScore: 0,
      medianScore: 0,
      averageGameTime: 0,
      averageTurnTimeAcrossGames: 0,
      lastGameStats: null,
    }),
    {
      name: "esp-trainer-history",
      partialize: (state) => ({
        history: state.history,
        totalGamesPlayed: 0, // Will be recalculated
        bestScore: 0, // Will be recalculated
        averageScore: 0, // Will be recalculated
        medianScore: 0, // Will be recalculated
        averageGameTime: 0, // Will be recalculated
        averageTurnTimeAcrossGames: 0, // Will be recalculated
        lastGameStats: null, // Will be recalculated
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Recalculate derived stats after rehydration
          const derivedStats = calculateDerivedStats(state.history);
          store.setState({
            ...state,
            ...derivedStats,
            lastGameStats:
              state.history.length > 0
                ? state.history[state.history.length - 1].stats
                : null,
          });
        }
      },
    }
  )
);

function useHistoryStore<U = HistoryStoreState>(
  fn: (state: HistoryStoreState) => U = (state) => state as U
) {
  return useStore(store, fn);
}

// Helper function to calculate derived stats
const calculateDerivedStats = (history: GameHistoryEntry[]) => {
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
  const medianScore = scores.sort((a, b) => a - b)[
    Math.floor(scores.length / 2)
  ];

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
    averageScore: Math.round(averageScore * 100) / 100, // Round to 2 decimal places
    medianScore,
    averageGameTime: Math.round(averageGameTime),
    averageTurnTimeAcrossGames: Math.round(averageTurnTimeAcrossGames),
  };
};

// Actions
const saveGameResult = (stats: GameStats, duration?: number) => {
  const entry: GameHistoryEntry = {
    id: `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    stats: { ...stats },
    duration,
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
  store.setState({
    history: [],
    totalGamesPlayed: 0,
    bestScore: 0,
    averageScore: 0,
    averageGameTime: 0,
    averageTurnTimeAcrossGames: 0,
    lastGameStats: null,
  });
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
  const exportData = {
    exportDate: new Date().toISOString(),
    totalGamesPlayed: state.totalGamesPlayed,
    bestScore: state.bestScore,
    averageScore: state.averageScore,
    averageGameTime: state.averageGameTime,
    averageTurnTimeAcrossGames: state.averageTurnTimeAcrossGames,
    history: state.history,
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
  actions: {
    saveGameResult,
    clearHistory,
    getRecentGames,
    getTopScores,
    getGameById,
    exportHistoryAsJSON,
  },
};
