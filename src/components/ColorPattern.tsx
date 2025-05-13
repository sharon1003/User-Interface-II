import React from "react";
import ColorPicker from "./ColorPicker";

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
    <div className="flex flex-col items-center gap-6">
      {/* Predefined Color Options */}
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
            onClick={() => onColorSelect(color)} // Update selected color
          />
        ))}
      </div>

      {/* Custom Color Picker */}
      <ColorPicker
        selectedColor={selectedColor}
        onColorSelect={onColorSelect} // Pass the color selection handler
      />
    </div>
  );
};

export default ColorPatternSelector;
