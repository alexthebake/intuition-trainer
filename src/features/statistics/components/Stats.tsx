import { styled } from "@/styles/jsx";
import {
  ExportHistoryButton,
  ResetHistoryButton,
  useHasHistory,
} from "@@/history";
import { ScoreChart } from "@@/statistics/components/ScoreChart";
import { ScoreDistributionChart } from "@@/statistics/components/ScoreDistributionChart";
import { StatCards } from "@@/statistics/components/StatCards";

export const Stats: React.FC = () => {
  const hasHistory = useHasHistory();

  return (
    <styled.div
      display="flex"
      flexDirection="column"
      gap="16"
      p="6"
      maxWidth={1200}
      mx="auto"
    >
      {/* Header with time period selector */}
      <styled.div display="flex" flexDirection="column">
        <styled.div
          display="flex"
          alignItems="center"
          gap="2"
          justifyContent="space-between"
          width="full"
        >
          <styled.h2 fontSize="2xl" fontWeight="bold">
            Game Statistics
          </styled.h2>

          {/* Export and Reset History Buttons */}
          <styled.div display="flex" alignItems="center" gap="2">
            <ExportHistoryButton disabled={!hasHistory} />
            <ResetHistoryButton disabled={!hasHistory} />
          </styled.div>
        </styled.div>
      </styled.div>

      {/* Charts */}
      {hasHistory ? (
        <>
          {/* Statistics Cards */}
          <StatCards />

          <styled.div
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="stretch"
            gap="4"
          >
            {/* Score Over Time and Game Duration Chart */}
            <ScoreChart />

            {/* Score Distribution Histogram */}
            <ScoreDistributionChart />
          </styled.div>
        </>
      ) : (
        <styled.div
          p="8"
          textAlign="center"
          bg="stats.card.bg"
          rounded="lg"
          border="1px solid"
          borderColor="stats.card.border"
        >
          <styled.div
            fontSize="lg"
            color={{ base: "gray.600", _dark: "gray.400" }}
          >
            No games played yet. Start playing to see your stats!
          </styled.div>
        </styled.div>
      )}
    </styled.div>
  );
};
