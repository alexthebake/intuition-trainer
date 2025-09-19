import { createStore, useStore } from "zustand";

import { Game, SerializedGameState } from "./game";
import { DEFAULT_IMAGES } from "./game.data";
import { GameResponse } from "./game.types";

export type GameStoreState = {
  game: Game;
  state: SerializedGameState;
};

const store = createStore<GameStoreState>()((set) => {
  const game = new Game({
    images: DEFAULT_IMAGES,
    onStateChange: (state) => {
      set({ state });
    },
  });

  return {
    game,
    state: game.getGameStateSnapshot(),
  };
});

function useGameStore<U = GameStoreState>(
  fn: (state: GameStoreState) => U = (state) => state as U
) {
  return useStore(store, fn);
}

// Actions
const startGame = () => {
  const { game } = store.getState();
  game.startGame();
};

const makeChoice = (buttonColor: GameResponse) => {
  const { game } = store.getState();
  return game.makeChoice(buttonColor);
};

const pass = () => {
  const { game } = store.getState();
  game.pass();
};

const hideCorrectChoice = () => {
  const { game } = store.getState();
  game.hideCorrectChoice();
};

const reset = () => {
  const { game } = store.getState();
  game.reset();
};

export const gameStore = {
  store,
  use: useGameStore,
  actions: {
    startGame,
    makeChoice,
    pass,
    hideCorrectChoice,
    reset,
  },
};
