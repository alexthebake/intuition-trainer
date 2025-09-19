import { styled } from "@/styles/jsx";
import { WithCss } from "@/styles/types";
import { useStatCards } from "@@/statistics/hooks/useStatCards";

export const StatCards: React.FC = () => {
  const {
    bestScore,
    averageScore,
    medianScore,
    totalGamesPlayed,
    averageGameTime,
    averageTurnTimeAcrossGames,
  } = useStatCards();

  return (
    <styled.div
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: "4", md: "16" }}
    >
      {/* Main Statistics Cards */}
      <styled.div display="flex" flexDirection="column" gap="2">
        <styled.h2 fontSize="md" fontWeight="bold">
          Statistics
        </styled.h2>

        <styled.div
          display="flex"
          alignItems="center"
          gap="4"
          justifyContent="center"
        >
          <StatCard value={bestScore} label="Best Score" />
          <StatCard value={averageScore} label="Average Score" />
          <StatCard value={medianScore} label="Median Score" />
          <StatCard value={totalGamesPlayed} label="Games Played" />
        </styled.div>
      </styled.div>

      {/* Timing Statistics Cards */}
      <styled.div display="flex" flexDirection="column" gap="2">
        <styled.h2 fontSize="md" fontWeight="bold">
          Timing Statistics
        </styled.h2>
        {averageGameTime > 0 && (
          <styled.div
            display="flex"
            alignItems="center"
            gap="4"
            justifyContent="center"
          >
            <StatCard value={`${averageGameTime}s`} label="Avg Game Time" />
            <StatCard
              value={`${averageTurnTimeAcrossGames}s`}
              label="Avg Turn Time"
            />
          </styled.div>
        )}
      </styled.div>
    </styled.div>
  );
};

// Helpers

type StatCardProps = {
  value: string | number;
  label: string;
} & WithCss;

const StatCard: React.FC<StatCardProps> = ({ value, label, css }) => (
  <styled.div
    p={4}
    bg="stats.card.bg"
    border="1px solid"
    borderColor="stats.card.border"
    rounded="lg"
    textAlign="center"
    minW="120px"
    css={css}
  >
    <styled.div fontSize="2xl" fontWeight="bold" color="stats.card.text">
      {value}
    </styled.div>
    <styled.div fontSize="sm" color="stats.card.text">
      {label}
    </styled.div>
  </styled.div>
);
