import { useMemo } from "react";

import { historyStore } from "@@/history";

export const useScoreDistribution = () => {
  const history = historyStore.use(({ history }) => history);

  // Prepare data for histogram (score distribution)
  const histogramData = useMemo(() => {
    return history.map((entry) => ({ score: entry.stats.score }));
  }, [history]);

  return {
    histogramData,
    hasData: history.length > 0,
  };
};
