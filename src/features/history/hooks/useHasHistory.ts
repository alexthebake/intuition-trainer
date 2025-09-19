import { TimePeriod } from "@@/statistics";
import { historyStore } from "@@/history/lib/history.store";

export const useHasHistory = (timePeriod: TimePeriod) => {
  return historyStore.use(({ history }) => {
    if (history.length === 0) return false;
    if (timePeriod === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return history.some((entry) => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime();
      });
    }
    return true;
  });
};
