import { useMemo } from "react";

import { historyStore } from "@@/history";

type TimePeriod = "today" | "all-time";

export const useScoreDistribution = (selectedPeriod: TimePeriod) => {
  const history = historyStore.use(({ history }) => history);

  // Filter data based on selected time period
  const filteredData = useMemo(() => {
    if (selectedPeriod === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return history.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime();
      });
    }
    return history;
  }, [history, selectedPeriod]);

  // Prepare data for histogram (score distribution)
  const histogramData = useMemo(() => {
    return filteredData.map((entry) => ({ score: entry.stats.score }));
  }, [filteredData]);

  return {
    histogramData,
    hasData: filteredData.length > 0,
  };
};
