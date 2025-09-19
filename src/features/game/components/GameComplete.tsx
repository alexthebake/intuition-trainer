import React from "react";
import { styled } from "@/styles/jsx";

type GameCompleteProps = {
  score: number;
  maxScore?: number;
};

export const GameComplete: React.FC<GameCompleteProps> = ({
  score,
  maxScore = 24,
}) => {
  return (
    <styled.div
      mt="5" // 20px
      p="5" // 20px
      bg="complete.bg"
      borderRadius="lg" // 8px
      textAlign="center"
      transition="background-color 0.3s ease"
    >
      <styled.h2
        fontSize="2xl" // 24px
        fontWeight="bold"
        mb="2.5" // 10px
        color="complete.text"
      >
        Game Complete!
      </styled.h2>
      <styled.p fontSize="lg" color="complete.text">
        Final Score: {score} / {maxScore}
      </styled.p>
    </styled.div>
  );
};
