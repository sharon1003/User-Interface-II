// components/LengthSelector.tsx

type LengthOption = 'short' | 'medium' | 'long';

interface Props {
  selected: LengthOption;
  onSelect: (length: LengthOption) => void;
}

const lengthOptions: { label: string; value: LengthOption }[] = [
  { label: 'Short', value: 'short' },
  { label: 'Medium', value: 'medium' },
  { label: 'Long', value: 'long' },
];

export const LengthSelector = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex gap-4 justify-center">
      {lengthOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`px-4 py-2 border rounded-full ${
            selected === opt.value
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-gray-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
