import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  shape: "almond" | "oval" | "squoval" | "coffin";
  length: "short" | "medium" | "long";
  color: string;
  step: number;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

interface Sticker {
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const NailCanvasPreview = ({
  shape,
  length,
  color,
  step,
  totalPrice,
  setTotalPrice,
}: Props) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const deleteSoundRef = useRef<HTMLAudioElement | null>(null);
  const redoSoundRef = useRef<HTMLAudioElement | null>(null);
  const undoSoundRef = useRef<HTMLAudioElement | null>(null);

  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [undoStack, setUndoStack] = useState<Sticker[][]>([]);
  const [redoStack, setRedoStack] = useState<Sticker[][]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Sticker price mapping
  const stickerPrices: Record<string, number> = {
    "🌸": 1.5,
    "✨": 2.0,
    "💫": 2.5,
    "🖤": 1.0,
    "🍓": 1.8,
  };

  const playSound = (ref: React.RefObject<HTMLAudioElement | null>) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current
        .play()
        .catch((err) => console.warn("Audio play failed:", err));
    }
  };

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
    setStickers(newStickers);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData("sticker");
    const { x, y } = getMousePos(e);
    if (!emoji) return;

    playSound(soundRef);

    // Add sticker price to total
    const stickerPrice = stickerPrices[emoji] || 0;
    setTotalPrice((prev) => prev + stickerPrice);

    updateStickers([...stickers, { emoji, x, y, scale: 1, rotation: 0 }]);
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
    setStickers((prev) => {
      const updated = [...prev];
      updated[draggingIndex] = { ...updated[draggingIndex], x, y };
      return updated;
    });
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
        playSound(deleteSoundRef);

        // Subtract sticker price from total
        const stickerPrice = stickerPrices[sticker.emoji] || 0;
        setTotalPrice((prev) => prev - stickerPrice);

        updateStickers(stickers.filter((_, index) => index !== i));
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
    setStickers(last);
    playSound(undoSoundRef);
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
    setStickers(next);
    playSound(redoSoundRef);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    const lengthRatio = {
      short: 0.4,
      medium: 0.6,
      long: 0.85,
    }[length];

    const nailHeight = height * 0.1 * lengthRatio;

    // draw a larger, more rectangular hand shape
    ctx.fillStyle = "#FAD8C9";
    ctx.beginPath();
    ctx.moveTo(140, 460); // bottom left
    ctx.quadraticCurveTo(90, 400, 90, 300); // thumb base moved left

    ctx.lineTo(90, 260); // shortened thumb
    ctx.quadraticCurveTo(100, 240, 110, 260);
    ctx.lineTo(135, 320);

    ctx.lineTo(160, 160);
    ctx.quadraticCurveTo(170, 140, 180, 160);
    ctx.lineTo(180, 320);

    ctx.lineTo(200, 140);
    ctx.quadraticCurveTo(210, 120, 220, 140);
    ctx.lineTo(220, 320);

    ctx.lineTo(240, 160);
    ctx.quadraticCurveTo(250, 140, 260, 160);
    ctx.lineTo(260, 320);

    ctx.lineTo(280, 180);
    ctx.quadraticCurveTo(290, 160, 300, 180);
    ctx.lineTo(300, 340);

    ctx.quadraticCurveTo(310, 420, 260, 460);
    ctx.closePath();
    ctx.fill();

    // draw nails aligned better to fingertips
    ctx.fillStyle = color;

    const drawNail = (x: number, y: number) => {
      ctx.beginPath();
      if (shape === "almond") {
        ctx.moveTo(x - 10, y);
        ctx.quadraticCurveTo(x, y - nailHeight - 30, x + 8, y);
      } else if (shape === "oval") {
        ctx.moveTo(x - 10, y);
        ctx.bezierCurveTo(
          x - 10,
          y - nailHeight,
          x + 10,
          y - nailHeight,
          x + 10,
          y
        );
      } else if (shape === "squoval") {
        ctx.moveTo(x - 10, y);
        ctx.lineTo(x - 10, y - nailHeight);
        ctx.quadraticCurveTo(x, y - nailHeight - 5, x + 10, y - nailHeight);
        ctx.lineTo(x + 10, y);
      } else if (shape === "coffin") {
        ctx.moveTo(x - 6, y);
        ctx.lineTo(x - 8, y - nailHeight);
        ctx.lineTo(x + 8, y - nailHeight);
        ctx.lineTo(x + 6, y);
      }
      ctx.closePath();
      ctx.fill();
    };

    drawNail(100, 260); // thumb

    drawNail(170, 160); // index
    drawNail(210, 140); // middle
    drawNail(250, 160); // ring
    drawNail(290, 180); // pinky

    // ✨ Draw placed stickers
    stickers.forEach(({ emoji, x, y, scale, rotation }) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.font = "20px serif";
      ctx.fillText(emoji, 0, 0);
      ctx.restore();
    });
  }, [shape, length, color, stickers]);

  return (
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
      {step === 4 && (
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
      )}
      <p className="mt-4 text-lg font-semibold">
        {t("customize.totalPrice")}: ${totalPrice.toFixed(2)}
      </p>
      <audio ref={soundRef} src="/sounds/drum.wav" preload="auto" />
      <audio ref={deleteSoundRef} src="/sounds/delete.wav" preload="auto" />
      <audio ref={undoSoundRef} src="/sounds/undo.wav" preload="auto" />
      <audio ref={redoSoundRef} src="/sounds/redo.wav" preload="auto" />
    </div>
  );
};

export default NailCanvasPreview;
