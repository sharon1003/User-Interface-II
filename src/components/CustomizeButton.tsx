import React from "react";
import { useSound } from "./useSound";

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
  const { playSound } = useSound();

  const handleClick = () => {
    playSound("button", soundSrc);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-4 py-2 rounded ${className} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default CustomizeButton;
