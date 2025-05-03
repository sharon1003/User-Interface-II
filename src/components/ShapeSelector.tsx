import { useTranslation } from "react-i18next";
type ShapeOption = "almond" | "oval" | "squoval" | "coffin";

interface Props {
  selected: ShapeOption;
  onSelect: (shape: ShapeOption) => void;
}

const shapeOptions: { label: string; value: ShapeOption; image: string }[] = [
  { label: "Almond", value: "almond", image: '/assets/almond.png' },
  { label: "Round/Oval", value: "oval", image: '/assets/round.png'},
  { label: "Squoval", value: "squoval", image: '/assets/squoval.png' },
  { label: "Coffin", value: "coffin", image: '/assets/coffin.png' },
];

export const ShapeSelector = ({ selected, onSelect }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-4 justify-center">
      {shapeOptions.map((opt) => (
        <button key={opt.value} onClick={() => onSelect(opt.value)} className="text-center">
          <img src={opt.image} alt={opt.label} className={`w-16 h-16 mx-auto ${selected === opt.value ? 'ring-2 ring-black' : ''}`} />
          <p className="text-sm mt-1">
            {t(`customize.shapes.${opt.value}`)}
          </p></button>
      ))}
    </div>
  );
};
