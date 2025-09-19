import React from "react";
import { styled } from "@/styles/jsx";

type ImageOverlayProps = {
  currentImageUrl: string | null;
  showImageOverlay: boolean;
  onImageError: (imageUrl: string | null) => void;
};

export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  currentImageUrl,
  showImageOverlay,
  onImageError,
}) => {
  if (!currentImageUrl) return null;

  return (
    <styled.div
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      pointerEvents="none"
      opacity={showImageOverlay ? 1 : 0}
      transition="opacity 0.5s ease-in-out"
    >
      <styled.img
        src={currentImageUrl}
        alt="ESP Training Image"
        maxWidth="90vw"
        maxHeight="90vh"
        objectFit="contain"
        borderRadius="lg"
        boxShadow="2xl"
        onError={() => onImageError(currentImageUrl)}
      />
    </styled.div>
  );
};
