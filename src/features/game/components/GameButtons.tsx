import { motion } from "framer-motion";

import { cva } from "@/styles/css";
import { styled } from "@/styles/jsx";

import { GameResponse } from "@@/game";

// Game Button CVA (updated for framer-motion)
const gameButtonStyles = cva({
  base: {
    border: "4px solid rgba(0, 0, 0, 0.25)",
    cursor: "pointer",
    position: "relative",
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  variants: {
    color: {
      red: {
        backgroundColor: "red.500",
        _hover: { backgroundColor: "red.600" },
        _disabled: {
          _hover: { backgroundColor: "red.500" },
        },
      },
      blue: {
        backgroundColor: "blue.500",
        _hover: { backgroundColor: "blue.600" },
        _disabled: {
          _hover: { backgroundColor: "blue.500" },
        },
      },
      green: {
        backgroundColor: "green.500",
        _hover: { backgroundColor: "green.600" },
        _disabled: {
          _hover: { backgroundColor: "green.500" },
        },
      },
      yellow: {
        backgroundColor: "yellow.400",
        _hover: { backgroundColor: "yellow.500" },
        _disabled: {
          _hover: { backgroundColor: "yellow.400" },
        },
      },
    },
  },
});

type GameButtonsProps = {
  onButtonClick: (color: GameResponse) => void;
  disabled: boolean;
  clickedButton: GameResponse | null;
  showCorrectChoice: boolean;
  currentCorrectButton: GameResponse | null;
};

export const GameButtons: React.FC<GameButtonsProps> = ({
  onButtonClick,
  disabled,
  clickedButton,
  showCorrectChoice,
  currentCorrectButton,
}) => {
  const getButtonStyles = (color: GameResponse) => {
    return gameButtonStyles({ color });
  };

  const getButtonAnimationProps = (color: GameResponse) => {
    const isClicked = clickedButton === color;
    const isHighlighted = showCorrectChoice && color === currentCorrectButton;

    return {
      animate: {
        scale: isClicked ? 0.9 : 1,
        boxShadow: isHighlighted ? "0 0 0 10px white inset" : "none",
      },
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        duration: 0.3, // Slightly longer for border animations
      },
    };
  };

  return (
    <styled.div
      position="relative"
      width="80"
      height="80"
      marginBottom="10"
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gridTemplateRows="1fr 1fr"
      gap="4"
      transform="rotate(-45deg) scale(0.8)"
    >
      <motion.button
        onClick={() => onButtonClick("green")}
        disabled={disabled}
        className={getButtonStyles("green")}
        {...getButtonAnimationProps("green")}
      />
      <motion.button
        onClick={() => onButtonClick("red")}
        disabled={disabled}
        className={getButtonStyles("red")}
        {...getButtonAnimationProps("red")}
      />
      <motion.button
        onClick={() => onButtonClick("yellow")}
        disabled={disabled}
        className={getButtonStyles("yellow")}
        {...getButtonAnimationProps("yellow")}
      />
      <motion.button
        onClick={() => onButtonClick("blue")}
        disabled={disabled}
        className={getButtonStyles("blue")}
        {...getButtonAnimationProps("blue")}
      />
    </styled.div>
  );
};
