import { useCallback, useEffect, useRef } from "react";

import { useTimeoutManager } from "@@/game/hooks/useTimeoutManager";
import { Game } from "@@/game/lib/game";
import { DEFAULT_IMAGES } from "@@/game/lib/game.data";
import { gameStore } from "@@/game/lib/game.store";
import { historyStore } from "@@/history/lib/history.store";

export const useGameLifecycle = () => {
  const gameCompletedRef = useRef(false);
  const gameStartTimeRef = useRef<number | null>(null);
  const { timeouts, clearTimeout } = useTimeoutManager();

  const game = gameStore.use(({ game }) => game);
  const status = gameStore.use(({ state }) => state.status);
  const isGameComplete = gameStore.use(({ state }) => state.isGameComplete);
  const showCorrectChoice = gameStore.use(
    ({ state }) => state.showCorrectChoice
  );

  // Initialize game with images on mount
  useEffect(() => {
    const game = new Game({
      images: DEFAULT_IMAGES,
      onStateChange: (newState) => {
        gameStore.store.setState({ state: newState });
      },
    });
    gameStore.store.setState({ game });
  }, []);

  // Track game completion and save to history
  useEffect(() => {
    if (status === "playing" && !gameCompletedRef.current) {
      // Game started, record start time
      gameStartTimeRef.current = Date.now();
      gameCompletedRef.current = false;
    } else if (isGameComplete && !gameCompletedRef.current) {
      // Game just completed, save to history
      gameCompletedRef.current = true;

      historyStore.actions.saveGameResult(game.gameStats);
    }
  }, [isGameComplete, status, game]);

  // Clean up showCorrectChoice when game completes
  useEffect(() => {
    if (isGameComplete && showCorrectChoice) {
      // Clear any existing timeout
      clearTimeout(timeouts.correctChoiceCleanup);

      // Hide correct choice highlight when game ends
      timeouts.correctChoiceCleanup.current = setTimeout(() => {
        gameStore.actions.hideCorrectChoice();
        timeouts.correctChoiceCleanup.current = null;
      }, 1500); // Show for a moment then hide
    }
  }, [isGameComplete, showCorrectChoice, timeouts, clearTimeout]);

  const resetGame = useCallback(() => {
    // Reset game completion tracking
    gameCompletedRef.current = false;
    gameStartTimeRef.current = null;

    // Reset game state
    gameStore.actions.reset();
  }, []);

  return {
    resetGame,
  };
};
