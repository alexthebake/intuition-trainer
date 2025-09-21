import { GAME_MODES, GameMode } from "@/features/game";
import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AppSettings = {
  mode: GameMode;
};

export type AppState = {
  settings: AppSettings;
};

const store = createStore<AppState>()(
  persist(
    () => ({
      settings: {
        mode: GAME_MODES.default.name,
      },
    }),
    {
      name: "esp-trainer-app",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function useApp<U = AppState>(
  fn: (state: AppState) => U = (state) => state as U
) {
  return useStore(store, fn);
}

// Actions

const setSettings = (settings: Partial<AppSettings>) => {
  store.setState({ settings: { ...store.getState().settings, ...settings } });
};

export const appStore = {
  store,
  use: useApp,
  actions: {
    setSettings,
  },
};
