import { useCallback, useEffect, useRef, useState } from "react";

import { useTimeoutManager } from "@@/game/hooks/useTimeoutManager";
import { gameStore } from "@@/game/lib/game.store";
import { GameMode, GameResponse } from "@@/game/lib/game.types";

type UseGameControlsProps = {
  onImageShow?: (imageName: string) => void;
  status: string;
  currentCorrectImage: string | null;
  chimeSrc?: string;
  chimeStartTime?: number;
  gameMode?: GameMode;
};

export const useGameControls = ({
  onImageShow,
  status,
  currentCorrectImage,
  chimeSrc = "/audio/tingsha.webm",
  chimeStartTime = 0,
  gameMode = "default",
}: UseGameControlsProps) => {
  const [clickedButton, setClickedButton] = useState<GameResponse | null>(null);
  const { timeouts, clearTimeout } = useTimeoutManager();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(chimeSrc);
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [chimeSrc]);

  const playChime = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = chimeStartTime;
      audioRef.current.play().catch((error) => {
        console.warn("Could not play chime sound:", error);
      });
    }
  }, [chimeStartTime]);

  const handleButtonClick = useCallback(
    (color: GameResponse) => {
      if (status !== "playing") return;

      // Clean up previous click animation timeout
      clearTimeout(timeouts.clickAnimation);

      // Animate button click
      setClickedButton(color);
      timeouts.clickAnimation.current = setTimeout(() => {
        setClickedButton(null);
        timeouts.clickAnimation.current = null;
      }, 200);

      const result = gameStore.actions.makeChoice(color);

      if (gameMode === "blind") {
        return;
      }

      // Handle audio/visual feedback here if needed
      if (result.shouldPlayChime) {
        playChime();
      }

      if (result.shouldShowImage && currentCorrectImage && onImageShow) {
        onImageShow(currentCorrectImage);
      }
    },
    [
      status,
      currentCorrectImage,
      onImageShow,
      timeouts,
      clearTimeout,
      playChime,
      gameMode,
    ]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (status !== "playing") return;

      const key = event.key.toLowerCase();
      let color: GameResponse | null = null;

      // Map keys to colors: WASD or Arrow keys
      switch (key) {
        case "w":
        case "arrowup":
          color = "red"; // Top
          break;
        case "a":
        case "arrowleft":
          color = "green"; // Left
          break;
        case "s":
        case "arrowdown":
          color = "yellow"; // Bottom
          break;
        case "d":
        case "arrowright":
          color = "blue"; // Right
          break;
        default:
          return; // Don't prevent default for other keys
      }

      if (color) {
        event.preventDefault();
        handleButtonClick(color);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [status, handleButtonClick]);

  const resetClickedButton = useCallback(() => {
    clearTimeout(timeouts.clickAnimation);
    setClickedButton(null);
  }, [timeouts, clearTimeout]);

  return {
    clickedButton,
    handleButtonClick,
    resetClickedButton,
  };
};
