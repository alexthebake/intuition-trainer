import { historyStore } from "@@/history/lib/history.store";

export const useHasHistory = () => {
  return historyStore.use(({ history }) => {
    return history.length > 0;
  });
};
