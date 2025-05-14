import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ShapeSelector } from "../components/ShapeSelector";
import { LengthSelector } from "../components/LengthSelector";
import ColorPatternSelector from "../components/ColorPattern";
import NailCanvasPreview from "../components/NailCanvasPreview";
import SelectPicture from "../components/SelectPicture";
import CustomizeButton from "../components/CustomizeButton";
import { useCart } from "../components/CartContext";
import { generateId } from "../utils/uuid";

const CustomizePage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [shape, setShape] = useState<"almond" | "oval" | "squoval" | "coffin">(
    "almond"
  );
  const [length, setLength] = useState<"short" | "medium" | "long">("short");
  const [color, setColor] = useState<string>("#F87171");

  const basePrice = 24.99;
  const [totalPrice, setTotalPrice] = useState<number>(basePrice);

  const lengthPrice: Record<"short" | "medium" | "long", number> = {
    short: 0,
    medium: 2,
    long: 3,
  };

  const handleLengthChange = (newLength: "short" | "medium" | "long") => {
    setLength(newLength);
    const newPrice = basePrice + lengthPrice[newLength];
    setTotalPrice(newPrice);
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const { addToCart } = useCart();

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "my-nail-design.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleSubmit = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const imageData = canvas.toDataURL("image/png");

    const nailDesign = {
      id: generateId(),
      category: "custom",
      image: imageData,
      price: totalPrice.toFixed(2),
      title: "Custom Nail Design",
      description: `Shape: ${shape}, Length: ${length}, Color: ${color}`,
      shape,
      length,
      color,
    };
    addToCart(nailDesign);
    alert("Nail design submitted!");
  };

  return (
    <div className="bg-[#f5f3ea] min-h-screen">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          {t("customize.title")}
        </h1>
        <div className="space-y-6">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-2">
                {t("customize.step1")}
              </h2>
              <ShapeSelector selected={shape} onSelect={setShape} />
              <div className="mt-6 flex justify-center">
                <CustomizeButton
                  onClick={handleNext}
                  soundSrc="/sounds/next.wav"
                  className="bg-black text-white"
                >
                  {t("customize.next")}
                </CustomizeButton>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-2">
                {t("customize.step2")}
              </h2>
              <LengthSelector selected={length} onSelect={handleLengthChange} />
              <div className="mt-6 flex justify-between">
                <CustomizeButton
                  onClick={handleBack}
                  soundSrc="/sounds/back.wav"
                  className="border"
                >
                  {t("customize.back")}
                </CustomizeButton>
                <CustomizeButton
                  onClick={handleNext}
                  soundSrc="/sounds/next.wav"
                  className="bg-black text-white"
                >
                  {t("customize.next")}
                </CustomizeButton>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-2">
                {t("customize.step3")}
              </h2>
              <ColorPatternSelector
                selectedColor={color}
                onColorSelect={setColor}
              />
              <div className="mt-6 flex justify-between">
                <CustomizeButton
                  onClick={handleBack}
                  soundSrc="/sounds/back.wav"
                  className="border"
                >
                  {t("customize.back")}
                </CustomizeButton>
                <CustomizeButton
                  onClick={handleNext}
                  soundSrc="/sounds/next.wav"
                  className="bg-black text-white"
                >
                  {t("customize.next")}
                </CustomizeButton>
              </div>
            </>
          )}

          {step === 4 && (
              <>
                  <h2 className="text-xl font-semibold mb-2">
                      {t("customize.step4")}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4 text-center">
                      {t("customize.stickersHelper.prefix")} <strong>{t("customize.stickersHelper.drag")}</strong> {t("customize.stickersHelper.middle")} <strong>{t("customize.stickersHelper.doubleClick")}</strong> {t("customize.stickersHelper.suffix")}
                  </p>
                  <SelectPicture/>
                  {/* Reset Button */}
                  {/* <div className="mt-4 text-center">
                      <button
                          onClick={() => setStickers([])}
                          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                          Reset Stickers
                      </button>
                  </div> */}
                  <div className="mt-6 flex justify-between">
                      <CustomizeButton onClick={handleBack} soundSrc="/sounds/back.wav" className="border">
                          {t("customize.back")}
                      </CustomizeButton>
                      <CustomizeButton onClick={handleNext} soundSrc="/sounds/next.wav"
                                      className="bg-black text-white">
                          {t("customize.next")}
                      </CustomizeButton>
                  </div>
              </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-xl font-semibold mb-2">
                {t("customize.step5")}
              </h2>
              <p>
                <strong>{t("customize.shape")}:</strong> {shape}
              </p>
              <p>
                <strong>{t("customize.length")}:</strong> {length}
              </p>
              <p>
                <strong>{t("customize.color")}:</strong>{" "}
                <span style={{ color }}>{color}</span>
              </p>
              <p>
                <strong>{t("customize.price")}:</strong> $
                {totalPrice.toFixed(2)}
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {t("customize.savePreview")}
                </button>
              </div>
              <div className="mt-6 flex justify-between">
                <CustomizeButton
                  onClick={handleBack}
                  soundSrc="/sounds/back.wav"
                  className="border"
                >
                  {t("customize.back")}
                </CustomizeButton>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {t("customize.submit")}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Preview */}
        <div className="mt-10 bg-gray-50 border rounded p-4">
          <h2 className="text-xl font-semibold mb-4">
            {t("customize.previewTitle")}
          </h2>
          <NailCanvasPreview
            shape={shape}
            length={length || "short"}
            color={color}
            step={step}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            {t("customize.previewDescription")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
