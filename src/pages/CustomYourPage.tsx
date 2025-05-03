import {useTranslation} from "react-i18next";
import { useState } from "react";
import NailPreview from "../components/NailPreview";

const nailSizes = ["XS", "S", "M", "L", "XL"];
const colors = ["#F87171", "#34D399", "#60A5FA", "#FBBF24", "#A78BFA"];
const patternOptions = [
  { label: "🌸", value: "flower" },
  { label: "✨", value: "sparkle" },
  { label: "🌿", value: "leaf" },
  { label: "🖤", value: "heart" },
  { label: "💫", value: "star" },
];

const CustomizePage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [pattern, setPattern] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const isConfirmDisabled = !size || !color || !pattern;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">🎨 Customize Your Nails</h2>

      {step === 1 && (
        <>
          <h3 className="font-semibold mb-3">Step 1: Choose Nail Size</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {nailSizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded border ${
                  size === s ? "bg-green-600 text-white" : "bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!size}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="font-semibold mb-3">Step 2: Choose Color</h3>
          <div className="flex justify-center gap-4 mb-6">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-full border-2 ${
                  color === c ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 border rounded">
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!color}
            //   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3 className="font-semibold mb-3">Step 3: Choose Pattern</h3>
          <div className="flex justify-center gap-4 mb-6 text-2xl">
            {patternOptions.map((p) => (
              <button
                key={p.value}
                onClick={() => setPattern(p.value)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  pattern === p.value ? "border-black" : "border-gray-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 border rounded">
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!pattern}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h3 className="font-semibold mb-3">Step 4: Summary</h3>
          <div className="mb-4 text-left">
            <p><strong>Size:</strong> {size}</p>
            <p><strong>Color:</strong> <span style={{ color }}>{color}</span></p>
            <p><strong>Pattern:</strong> {pattern}</p>
          </div>
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 border rounded">
              Back
            </button>
            <button
              onClick={() => alert("Customization submitted!")}
              disabled={isConfirmDisabled}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {/* Live Preview */}
      <div className="mt-10 bg-gray-50 border rounded p-4">
        <h2 className="text-xl font-semibold mb-4">
          {t("customize.previewTitle")}
        </h2>
        <NailPreview shape={shape} length={length} />
        <p className="text-sm text-gray-500 mt-2 text-center">
          {t("customize.previewDescription")}
        </p>
      </div>
    </div>
  );
};

export default CustomizePage;
