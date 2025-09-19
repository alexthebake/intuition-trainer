import { useState } from "react";

import { styled } from "@/styles/jsx";
import { Button } from "@/ui/Button";
import {
  ExportHistoryButton,
  ResetHistoryButton,
  useHasHistory,
} from "@@/history";
import { ScoreChart } from "@@/statistics/components/ScoreChart";
import { ScoreDistributionChart } from "@@/statistics/components/ScoreDistributionChart";
import { StatCards } from "@@/statistics/components/StatCards";
import { TimePeriod } from "@@/statistics/statistics.types";

export const Stats: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("all-time");

  const hasHistory = useHasHistory(selectedPeriod);

  return (
    <styled.div
      display="flex"
      flexDirection="column"
      gap="6"
      p="6"
      maxWidth={1200}
      mx="auto"
    >
      {/* Header with time period selector */}
      <styled.div display="flex" flexDirection="column" gap="4">
        <styled.h2 fontSize="2xl" fontWeight="bold">
          Game Statistics
        </styled.h2>

        <styled.div
          display="flex"
          alignItems="center"
          gap="2"
          justifyContent="space-between"
          width="full"
        >
          <styled.div display="flex" alignItems="center" gap="2">
            <Button
              onClick={() => setSelectedPeriod("today")}
              variant={selectedPeriod === "today" ? "primary" : "secondary"}
              size="xs"
              disabled={!hasHistory}
            >
              Today
            </Button>
            <Button
              onClick={() => setSelectedPeriod("all-time")}
              variant={selectedPeriod === "all-time" ? "primary" : "secondary"}
              size="xs"
              disabled={!hasHistory}
            >
              All Time
            </Button>
          </styled.div>

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
          <StatCards selectedPeriod={selectedPeriod} />

          <styled.div
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="stretch"
            gap="4"
          >
            {/* Score Over Time and Game Duration Chart */}
            <ScoreChart selectedPeriod={selectedPeriod} />

            {/* Score Distribution Histogram */}
            <ScoreDistributionChart selectedPeriod={selectedPeriod} />
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
            {selectedPeriod === "today"
              ? "No games played today yet. Start playing to see your stats!"
              : "No games played yet. Start playing to see your stats!"}
          </styled.div>
        </styled.div>
      )}
    </styled.div>
  );
};
