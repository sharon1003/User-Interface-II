import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useCart } from "../components/CartContext";
import { generateId } from "../utils/uuid";
import NailCanvasPreview from "../components/NailCanvasPreview";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import Step4 from "../components/steps/Step4";
import Step5 from "../components/steps/Step5";
import { lengthPrice, stickerPrices } from "../constants";
import type { Sticker } from "../types/Sticker";

const CustomizePage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [shape, setShape] = useState<"almond" | "oval" | "squoval" | "coffin">(
    "almond"
  );
  const [length, setLength] = useState<"short" | "medium" | "long">("short");
  const [color, setColor] = useState<string>("#F87171");
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]);

  const basePrice = 24.99;
  const [totalPrice, setTotalPrice] = useState<number>(basePrice);

  // Helper to recalculate total price
  const recalculateTotalPrice = (
    len: "short" | "medium" | "long",
    stickers: Sticker[]
  ) => {
    const stickersTotal = stickers.reduce(
      (sum, s) => sum + (stickerPrices[s.emoji] || 0),
      0
    );
    setTotalPrice(basePrice + lengthPrice[len] + stickersTotal);
  };

  const handleLengthChange = (newLength: "short" | "medium" | "long") => {
    setLength(newLength);
    recalculateTotalPrice(newLength, selectedStickers);
  };

  // Call this when stickers are added/removed
  const handleStickersChange = (newStickers: Sticker[]) => {
    setSelectedStickers(newStickers);
    recalculateTotalPrice(length, newStickers);
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
            <Step1
              shape={shape}
              setShape={setShape}
              t={t}
              handleNext={handleNext}
            />
          )}
          {step === 2 && (
            <Step2
              length={length}
              handleLengthChange={handleLengthChange}
              t={t}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
          {step === 3 && (
            <Step3
              color={color}
              setColor={setColor}
              t={t}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
          {step === 4 && (
            <Step4 t={t} handleBack={handleBack} handleNext={handleNext} />
          )}
          {step === 5 && (
            <Step5
              shape={shape}
              length={length}
              color={color}
              totalPrice={totalPrice}
              t={t}
              handleBack={handleBack}
              handleDownload={handleDownload}
              handleSubmit={handleSubmit}
            />
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
            stickers={selectedStickers}
            onStickersChange={handleStickersChange}
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
