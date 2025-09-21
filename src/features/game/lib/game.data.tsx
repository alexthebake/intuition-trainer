import { styled } from "@/styles/jsx";
import { GameMode } from "@@/game/lib/game.types";

export const DEFAULT_IMAGES = [
  "1024px-Cataratas_do_Iguacu_-_Foz_do_Iguacu_-_Parana_9.jpg",
  "1243559_w-3840_h-2160_q-70_m-crop.jpg",
  "8c1c21_31768b0ccd1c4eecb6920b452b2ce7ad~mv2.avif",
  "9311.jpg",
  "Colosseo_2020.jpg",
  "Galapagos-Ecuador-cr-Shutterstock.jpg",
  "Grand-Canyon-Package-1024x717.jpg",
  "Lake-Moraine-in-Banff-Canada-1.jpg",
  "Neuschwanstein-Castle-Germany-5-scaled.webp",
  "Pyramids_of_the_Giza_Necropolis.jpg",
  "The-Treasury-of-Petra-wide-Jordan-tour-2721.jpg",
  "Victoria-Falls-in-Zimbabwe-1080x675.jpg",
  "amazon_us-forest-service-1041.jpeg",
  "article-how-you-can-save…eef-in-australia-02.jpg",
  "Screen-Shot-2019-12-23-at-2.35.47-PM.png",
  "asMq6cVwZsckf8sGUaRJU4.jpg",
  "ca7ac4aee7c76e56fa223e373dfb5c6d0776d2b96aaa5a555c3bbdc6efc29d09.avif",
  "image_processing20191012-4-1e4s9uy.jpg",
  "machu-picchu-peru-1.webp",
  "niagara-falls.jpg",
  "the-great-wall-of-china.jpg",
  "tomb-kv-egyptian-valley-kings-theban-necropolis-egypt-luxor-303489192.webp",
  "ven_angelfalls_shutterstock_141881491-scaled-1024x683-c-center.jpg",
  "image_processing20191216-4-10ubrbv.jpg",
];

type GameModeConfig = {
  name: GameMode;
  description: React.ReactNode;
};

export const createGameModeConfig = (
  name: GameMode,
  description: React.ReactNode
): GameModeConfig => {
  return {
    name,
    description,
  };
};

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  default: createGameModeConfig(
    "default",
    <styled.p>
      In this mode, you will know if your choice is correct or not with each
      turn. This version of the game is just like the original ESP Trainer app.
    </styled.p>
  ),
  blind: createGameModeConfig(
    "blind",
    <styled.p>
      In this mode, you will <styled.span fontWeight="bold">NOT</styled.span>{" "}
      know if your choice is correct or not with each turn. You will have to
      continue guessing until the game is complete, and only then will you see
      your final score.
    </styled.p>
  ),
};

export function getGameModeDescription(mode: GameMode) {
  if (!GAME_MODES[mode]) {
    return "Unknown mode.";
  }

  return GAME_MODES[mode].description;
}
