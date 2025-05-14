import React, { useRef } from "react";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  soundSrc?: string;
}

const CustomizeButton: React.FC<Props> = ({
  onClick,
  children,
  disabled,
  className,
  soundSrc = "/sounds/next.wav",
}) => {
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (soundRef.current) {
      console.log("Audio Failed");
      soundRef.current.currentTime = 0;
      soundRef.current
        .play()
        .catch((err) => console.warn("Audio play failed:", err));
    }
    onClick();
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`px-4 py-2 rounded ${className} ${
          disabled ? "opacity-50" : ""
        }`}
      >
        {children}
      </button>
      <audio ref={soundRef} src={soundSrc} preload="auto" />
    </>
  );
};

export default CustomizeButton;
