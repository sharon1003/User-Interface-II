import React from "react";

interface Props {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const colorOptions = [
  "#F87171", // red
  "#34D399", // green
  "#60A5FA", // blue
  "#FBBF24", // yellow
  "#A78BFA", // purple
  "#F472B6", // pink
];

const ColorPatternSelector = ({ selectedColor, onColorSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {colorOptions.map((color) => (
        <button
          key={color}
          className={`w-10 h-10 rounded-full border-2 ${
            selectedColor === color
              ? "border-black scale-110"
              : "border-transparent"
          } transition-transform`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  );
};

export default ColorPatternSelector;
