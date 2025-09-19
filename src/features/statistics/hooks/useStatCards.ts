import { historyStore } from "@@/history";

export const useStatCards = () => {
  return historyStore.useDerivedStats();
};
