import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

function ColorPicker({ selectedColor, onColorSelect }: Props) {
  const { t } = useTranslation(); // Add translation hook

  function handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    onColorSelect(event.target.value);
  }

  return (
    <div className="color-picker-container flex flex-col items-center gap-4">
      <label className="text-sm text-gray-600">
      {t("customize.customColor")}: {selectedColor} {/* Use translation key */}
      </label>
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        className="w-10 cursor-pointer p-0 appearance-none"
        style={{
          backgroundColor: selectedColor,
        }}
      />
    </div>
  );
}
export default ColorPicker;
