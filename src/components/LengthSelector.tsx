// components/LengthSelector.tsx
import { useTranslation } from "react-i18next";

type LengthOption = "short" | "medium" | "long";

interface Props {
  selected: LengthOption;
  onSelect: (length: LengthOption) => void;
}

const lengthOptions: LengthOption[] = ["short", "medium", "long"];

// Add the price mapping for each length
const lengthPrice: Record<LengthOption, number> = {
  short: 0,
  medium: 2,
  long: 3,
};

export const LengthSelector = ({ selected, onSelect }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 justify-center">
      {lengthOptions.map((length) => (
        <div key={length} className="text-center">
          <button
            key={length}
            onClick={() => onSelect(length)}
            className={`px-4 py-2 border rounded-full ${
              selected === length
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {t(`customize.lengths.${length}`)}
          </button>
          {/* Display the price below the button */}
          <p className="text-sm text-gray-500 mt-1">
            +${lengthPrice[length].toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};
