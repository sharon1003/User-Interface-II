import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { stickerPrices } from "../constants";
import { useNailCanvas } from "./useNailCanvas";
import { useSound } from "./useSound";
import StickerManager from "./StickerManager";
import type { Sticker } from "../types/Sticker";
import type { ShapeOption, LengthOption } from "../types/NailOptions";

interface Props {
  shape: ShapeOption;
  length: LengthOption;
  color: string;
  step: number;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  stickers: Sticker[];
  onStickersChange: (stickers: Sticker[]) => void;
}

const NailCanvasPreview = ({
  shape,
  length,
  color,
  step,
  totalPrice,
  setTotalPrice,
  stickers,
  onStickersChange,
}: Props) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [undoStack, setUndoStack] = useState<Sticker[][]>([]);
  const [redoStack, setRedoStack] = useState<Sticker[][]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [customStickers, setCustomStickers] = useState<
    { emoji: string; imageUrl: string }[]
  >([]);

  // Image cache to prevent reloading
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // Use custom hooks
  useNailCanvas({
    canvasRef,
    shape,
    length,
    color,
    stickers,
    imageCache,
    setStickers: (value) => {
      if (typeof value === "function") {
        onStickersChange(value(stickers));
      } else {
        onStickersChange(value);
      }
    },
  });
  const { playSound } = useSound();

  const getMousePos = (e: React.MouseEvent | React.DragEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const updateStickers = (newStickers: Sticker[]) => {
    setUndoStack((prev) => [...prev, stickers]);
    setRedoStack([]);
    onStickersChange(newStickers);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData("sticker");
    const imageUrl = e.dataTransfer.getData("image-url");
    const { x, y } = getMousePos(e);

    if (!emoji && !imageUrl) return;

    playSound("drop", "/sounds/drum.wav");

    // Add sticker price to total
    const stickerPrice = stickerPrices[emoji] || 0;
    setTotalPrice((prev) => prev + stickerPrice);

    updateStickers([
      ...stickers,
      {
        emoji: emoji || "📸", // Use camera emoji as placeholder for image stickers
        x,
        y,
        scale: 0.7,
        rotation: 0,
        imageUrl: imageUrl || undefined,
      },
    ]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    for (let i = stickers.length - 1; i >= 0; i--) {
      const sticker = stickers[i];
      const dist = Math.hypot(sticker.x - x, sticker.y - y);
      if (dist < 20) {
        setDraggingIndex(i);
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingIndex === null) return;
    const { x, y } = getMousePos(e);
    onStickersChange(
      stickers.map((sticker, idx) =>
        idx === draggingIndex ? { ...sticker, x, y } : sticker
      )
    );
  };

  const handleMouseUp = () => {
    if (draggingIndex !== null) {
      setUndoStack((prev) => [...prev, stickers]);
    }
    setDraggingIndex(null);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    for (let i = stickers.length - 1; i >= 0; i--) {
      const sticker = stickers[i];
      const dist = Math.hypot(sticker.x - x, sticker.y - y);
      if (dist < 20) {
        playSound("delete", "/sounds/delete.wav");

        // Subtract sticker price from total
        const stickerPrice = stickerPrices[sticker.emoji] || 0;
        setTotalPrice((prev) => prev - stickerPrice);

        onStickersChange(stickers.filter((_, index) => index !== i));
        return;
      }
    }
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const last = undoStack[undoStack.length - 1];

    const currentStickerPrice = stickers.reduce(
      (sum, sticker) => sum + (stickerPrices[sticker.emoji] || 0),
      0
    );
    const lastStickerPrice = last.reduce(
      (sum, sticker) => sum + (stickerPrices[sticker.emoji] || 0),
      0
    );

    // Adjust the total price
    setTotalPrice((prev) => prev - (currentStickerPrice - lastStickerPrice));

    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, stickers]);
    onStickersChange(last);
    playSound("undo", "/sounds/undo.wav");
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];

    const currentStickerPrice = stickers.reduce(
      (sum, sticker) => sum + (stickerPrices[sticker.emoji] || 0),
      0
    );
    const nextStickerPrice = next.reduce(
      (sum, sticker) => sum + (stickerPrices[sticker.emoji] || 0),
      0
    );

    // Adjust the total price
    setTotalPrice((prev) => prev + (nextStickerPrice - currentStickerPrice));

    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, stickers]);
    onStickersChange(next);
    playSound("redo", "/sounds/redo.wav");
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert(t("customize.onlyImagesAllowed"));
      return;
    }

    // Create object URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);

    // Create a placeholder emoji (camera icon)
    const emoji = "📸";

    // Add to custom stickers
    setCustomStickers((prev) => [...prev, { emoji, imageUrl }]);

    // Preload the image
    const img = new Image();
    img.src = imageUrl;
    imageCache.current.set(imageUrl, img);

    playSound("upload", "/sounds/upload.wav");

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle custom sticker drag
  const handleCustomStickerDrag =
    (imageUrl: string, emoji: string) => (e: React.DragEvent) => {
      e.dataTransfer.setData("sticker", emoji);
      e.dataTransfer.setData("image-url", imageUrl);
    };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        className="w-full flex flex-col justify-center items-center"
      >
        <canvas
          ref={canvasRef}
          className="border rounded w-3/4 h-auto bg-white"
        />
      </div>

      {step === 4 && (
        <>
          <div className="flex gap-2 mt-4">
            <button
              onClick={undo}
              className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 active:scale-95 transition"
            >
              {t("customize.undo")}
            </button>
            <button
              onClick={redo}
              className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 active:scale-95 transition"
            >
              {t("customize.redo")}
            </button>
          </div>
          <StickerManager
            customStickers={customStickers}
            onFileUpload={handleFileUpload}
            onStickerDrag={handleCustomStickerDrag}
            fileInputRef={fileInputRef}
            t={t}
          />
        </>
      )}

      <p className="mt-4 text-lg font-semibold">
        {t("customize.totalPrice")}: ${totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default NailCanvasPreview;
