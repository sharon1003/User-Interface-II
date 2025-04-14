import { useState } from 'react';
import { ShapeSelector } from '../components/ShapeSelector';
import { LengthSelector } from '../components/LengthSelector';
import NailPreview from '../components/NailPreview';
import ColorPatternSelector from '../components/ColorPattern';
import NailCanvasPreview from '../components/NailCanvasPreview';


const CustomizePage = () => {
  const [step, setStep] = useState(1);
  const [shape, setShape] = useState<'almond' | 'oval' | 'squoval' | 'coffin'>('almond');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('short');
  const [color, setColor] = useState<string>('#F87171');


  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Design Your Press-On Nails 💅</h1>

      {/* 選擇步驟區域 */}
      <div className="space-y-6">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Step 1: Choose Shape</h2>
            <ShapeSelector selected={shape} onSelect={setShape} />
            <div className="mt-6 flex justify-center">
                <button
                onClick={handleNext}
                disabled={!shape}
                className="mt-6 px-4 py-2 bg-black text-white rounded disabled:opacity-50"
                >
                Next
                </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Step 2: Choose Length</h2>
            <LengthSelector selected={length} onSelect={setLength} />
            <div className="mt-6 flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border rounded">Back</button>
              <button
                onClick={handleNext}
                disabled={!length}
                className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Step 3: Choose Color</h2>
            <ColorPatternSelector selectedColor={color} onColorSelect={setColor} />
            <div className="mt-6 flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border rounded">Back</button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Step 4: Summary</h2>
            <p><strong>Shape:</strong> {shape}</p>
            <p><strong>Length:</strong> {length}</p>
            <p><strong>Color:</strong> <span style={{ color }}>{color}</span></p>
            <div className="mt-6 flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border rounded">Back</button>
              <button
                onClick={() => alert('Customization submitted!')}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>

      {/* 下方：即時預覽區域 */}
      <div className="mt-10 bg-gray-50 border rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <NailCanvasPreview shape={shape} length={length || 'short'} color={color} />
        <p className="text-sm text-gray-500 mt-2 text-center">Your customized nail preview</p>
      </div>
    </div>
  );
};

export default CustomizePage;
