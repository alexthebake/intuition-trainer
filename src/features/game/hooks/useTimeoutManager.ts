import React from "react";

type TimeoutRef = React.MutableRefObject<NodeJS.Timeout | null>;

export const useTimeoutManager = () => {
  const imageHideTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const imageCleanupTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const clickAnimationTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const correctChoiceCleanupTimeoutRef = React.useRef<NodeJS.Timeout | null>(
    null
  );

  const clearTimeout = (timeoutRef: TimeoutRef) => {
    if (timeoutRef.current) {
      globalThis.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearAllTimeouts = React.useCallback(() => {
    clearTimeout(imageHideTimeoutRef);
    clearTimeout(imageCleanupTimeoutRef);
    clearTimeout(clickAnimationTimeoutRef);
    clearTimeout(correctChoiceCleanupTimeoutRef);
  }, []);

  // Cleanup all timeouts on unmount
  React.useEffect(() => {
    return clearAllTimeouts;
  }, [clearAllTimeouts]);

  return {
    timeouts: {
      imageHide: imageHideTimeoutRef,
      imageCleanup: imageCleanupTimeoutRef,
      clickAnimation: clickAnimationTimeoutRef,
      correctChoiceCleanup: correctChoiceCleanupTimeoutRef,
    },
    clearTimeout,
    clearAllTimeouts,
  };
};
