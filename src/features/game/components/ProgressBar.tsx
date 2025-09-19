import React from "react";
import { styled } from "@/styles/jsx";
import { times } from "lodash";

type ProgressBarProps = {
  score: number;
  maxScore?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  score,
  maxScore = 24,
}) => {
  const scoreProgressPercentage = (score / maxScore) * 100;

  return (
    <styled.div
      display="flex"
      flexDirection="column"
      gap="1"
      width="96"
      mb="16" // TODO: Do this differently
    >
      {/* Progress Bar */}
      <styled.div
        width="full"
        height="1"
        bg="progress.bg"
        borderRadius="2xl"
        overflow="hidden"
      >
        <styled.div
          height="100%"
          bg="progress.fill"
          transition="width 0.3s ease"
          borderRadius="2xl"
          style={{ width: `${scoreProgressPercentage}%` }}
        />
      </styled.div>

      {/* Progress ticks */}
      <styled.div
        width="full"
        display="flex"
        justifyContent="space-between"
        mx="1px"
      >
        {times(25, (i) => (
          <styled.div
            key={i}
            width="1px"
            height="1"
            bg="progress.tick"
            opacity={i % 6 === 0 ? 1 : 0.5}
            position="relative"
          >
            {i % 6 === 0 && (
              <styled.div
                position="absolute"
                top="2"
                left="50%"
                transform="translateX(-50%)"
                fontSize="sm"
                fontWeight="bold"
                color="text"
              >
                <span>{i}</span>
              </styled.div>
            )}
          </styled.div>
        ))}
      </styled.div>

      {/* Progress Labels */}
      {/* <styled.div
        width="full"
        display="flex"
        justifyContent="space-between"
        fontSize="sm"
        fontWeight="bold"
        color="text"
      >
        <span>0</span>
        <span>6</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </styled.div> */}
    </styled.div>
  );
};
