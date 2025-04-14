import almondImg from '../assets/almond.png';
import ovalImg from '../assets/round.png';
import squovalImg from '../assets/squoval.png';
import coffinImg from '../assets/coffin.png';

type ShapeOption = "almond" | "oval" | "squoval" | "coffin";

interface Props {
  selected: ShapeOption;
  onSelect: (shape: ShapeOption) => void;
}

const shapeOptions: { label: string; value: ShapeOption; image: string }[] = [
  { label: "Almond", value: "almond", image: almondImg },
  { label: "Round/Oval", value: "oval", image: ovalImg },
  { label: "Squoval", value: "squoval", image: squovalImg },
  { label: "Coffin", value: "coffin", image: coffinImg },
];

export const ShapeSelector = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex gap-4 justify-center">
      {shapeOptions.map((opt) => (
        <button key={opt.value} onClick={() => onSelect(opt.value)} className="text-center">
          <img src={opt.image} alt={opt.label} className={`w-16 h-16 mx-auto ${selected === opt.value ? 'ring-2 ring-black' : ''}`} />
          <p className="text-sm mt-1">{opt.label}</p>
        </button>
      ))}
    </div>
  );
};
