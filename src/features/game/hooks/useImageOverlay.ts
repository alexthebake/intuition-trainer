import { useCallback, useState } from "react";

import { useTimeoutManager } from "@@/game/hooks/useTimeoutManager";

export const DEFAULT_CSS_TRANSITION_DURATION = 500;
export const DEFAULT_IMAGE_HIDE_DURATION = 1000;

export type UseImageOverlayOptions = {
  cssTransitionDuration?: number;
  imageHideDuration?: number;
};

export const useImageOverlay = (options: UseImageOverlayOptions = {}) => {
  const cssTransitionDuration =
    options.cssTransitionDuration ?? DEFAULT_CSS_TRANSITION_DURATION;
  const imageHideDuration =
    options.imageHideDuration ?? DEFAULT_IMAGE_HIDE_DURATION;

  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const { timeouts, clearTimeout } = useTimeoutManager();

  const showImage = useCallback(
    (imageName: string) => {
      // Clean up any existing image timeouts
      clearTimeout(timeouts.imageHide);
      clearTimeout(timeouts.imageCleanup);

      // Show image overlay
      setCurrentImageUrl(`/images/${imageName}`);
      setShowImageOverlay(true);

      // Hide image after timeout duration with fade
      timeouts.imageHide.current = setTimeout(() => {
        setShowImageOverlay(false);
        timeouts.imageHide.current = null;

        // Clear image URL after fade completes
        timeouts.imageCleanup.current = setTimeout(() => {
          setCurrentImageUrl(null);
          timeouts.imageCleanup.current = null;
        }, cssTransitionDuration); // Match CSS transition duration
      }, imageHideDuration);
    },
    [timeouts, clearTimeout, cssTransitionDuration, imageHideDuration]
  );

  const hideImage = useCallback(() => {
    clearTimeout(timeouts.imageHide);
    clearTimeout(timeouts.imageCleanup);
    setShowImageOverlay(false);
    setCurrentImageUrl(null);
  }, [timeouts, clearTimeout]);

  const handleImageError = useCallback(
    (imageUrl: string | null) => {
      console.error("Failed to load image:", imageUrl);
      hideImage();
    },
    [hideImage]
  );

  return {
    showImageOverlay,
    currentImageUrl,
    showImage,
    hideImage,
    handleImageError,
  };
};
