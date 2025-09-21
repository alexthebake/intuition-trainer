import { useCallback } from "react";

import { appStore } from "@/features/app";
import { styled } from "@/styles/jsx";
import { BlindModeWarning } from "@@/game/components/BlindModeWarning";
import { GameButtons } from "@@/game/components/GameButtons";
import { GameComplete } from "@@/game/components/GameComplete";
import { GameControls } from "@@/game/components/GameControls";
import { ImageOverlay } from "@@/game/components/ImageOverlay";
import { ProgressBar } from "@@/game/components/ProgressBar";
import { useGameControls } from "@@/game/hooks/useGameControls";
import { useGameLifecycle } from "@@/game/hooks/useGameLifecycle";
import { useImageOverlay } from "@@/game/hooks/useImageOverlay";
import { useTimeoutManager } from "@@/game/hooks/useTimeoutManager";
import { gameStore } from "@@/game/lib/game.store";

export const GameStage: React.FC = () => {
  const gameMode = appStore.use((state) => state.settings.mode);
  const isBlindMode = gameMode === "blind";

  const {
    currentTurn,
    score,
    status,
    showCorrectChoice,
    currentCorrectButton,
    currentCorrectImage,
    previouslyCorrectButton,
    isGameComplete,
  } = gameStore.use(({ state }) => state);

  // Initialize custom hooks
  const { resetGame } = useGameLifecycle();
  const { clearAllTimeouts } = useTimeoutManager();
  const {
    showImageOverlay,
    currentImageUrl,
    showImage,
    hideImage,
    handleImageError,
  } = useImageOverlay();

  const { clickedButton, handleButtonClick, resetClickedButton } =
    useGameControls({
      status,
      onImageShow: showImage,
      currentCorrectImage,
      chimeStartTime: 1.2,
      gameMode,
    });

  const handleReset = useCallback(() => {
    clearAllTimeouts();
    hideImage();
    resetClickedButton();
    resetGame();
  }, [clearAllTimeouts, hideImage, resetClickedButton, resetGame]);

  const handlePass = useCallback(() => {
    gameStore.actions.pass();
  }, []);

  return (
    <styled.div
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="6"
      paddingTop={{ base: "16", md: "6" }}
      fontFamily="sans"
    >
      <styled.div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        maxWidth="450"
        gap="2"
        mb="16"
      >
        <styled.p fontSize="sm" color="text.secondary">
          Behind one of these buttons is an image. Your job is to guess which
          button is the correct one. Listen to your intuition and{" "}
          <em>good luck!</em>
        </styled.p>
      </styled.div>

      {!isBlindMode && <ProgressBar score={score} />}

      <GameButtons
        onButtonClick={handleButtonClick}
        disabled={status !== "playing"}
        clickedButton={clickedButton}
        showCorrectChoice={showCorrectChoice && !isBlindMode}
        previouslyCorrectButton={previouslyCorrectButton}
      />

      {/* Turn Counter */}
      <styled.div textAlign="center" mb="4">
        <styled.div fontSize="2xl" fontWeight="bold" color="text">
          Turn {currentTurn}
        </styled.div>
        <styled.div fontSize="sm" color="text.muted">
          of 24
        </styled.div>
      </styled.div>

      {/* Keyboard Controls Hint */}
      <styled.div
        fontSize="sm"
        color="text.secondary"
        textAlign="center"
        mb="8"
      >
        Use WASD or Arrow Keys
      </styled.div>

      <GameControls
        onReset={handleReset}
        onPass={handlePass}
        isGameComplete={isGameComplete}
        passDisabled={status !== "playing"}
      />

      {isBlindMode && <BlindModeWarning />}
      {isGameComplete && <GameComplete score={score} />}

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === "development" && false && (
        <styled.div
          mt="5" // 20px
          p="2.5" // 10px
          bg="debug.bg"
          borderRadius="sm" // 4px
          fontSize="xs" // 12px
          fontFamily="mono"
          color="debug.text"
        >
          Status: {status} | Turn: {currentTurn} | Score: {score} | Correct:{" "}
          {currentCorrectButton} | Show: {showCorrectChoice ? "Yes" : "No"}
        </styled.div>
      )}

      <ImageOverlay
        currentImageUrl={currentImageUrl}
        showImageOverlay={showImageOverlay}
        onImageError={handleImageError}
      />
    </styled.div>
  );
};
