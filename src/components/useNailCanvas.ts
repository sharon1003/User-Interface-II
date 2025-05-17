import { useEffect } from "react";
import type { Sticker } from "../types/Sticker";

export function useNailCanvas({
  canvasRef,
  shape,
  length,
  color,
  stickers,
  imageCache,
  setStickers,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  shape: "almond" | "oval" | "squoval" | "coffin";
  length: "short" | "medium" | "long";
  color: string;
  stickers: Sticker[];
  imageCache: React.RefObject<Map<string, HTMLImageElement>>;
  setStickers: React.Dispatch<React.SetStateAction<Sticker[]>>;
}) {
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
    const nailWidth = 20; // ⬅️ Increased width for broader nails

    ctx.save();
    ctx.translate(-40, -60);
    ctx.scale(1.25, 1.25); // ⬅️ Scale up whole hand & nails for bigger proportion

    // Draw hand shape
    ctx.fillStyle = "#FAD8C9";
    ctx.beginPath();

    ctx.moveTo(140, 460);
    ctx.quadraticCurveTo(90, 400, 90, 300);

    ctx.lineTo(90, 260);
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

    // Draw nails
    ctx.fillStyle = color;
    const drawNail = (x: number, y: number) => {
      ctx.beginPath();
      if (shape === "almond") {
        ctx.moveTo(x - nailWidth / 2, y);
        ctx.quadraticCurveTo(x, y - nailHeight - 30, x + nailWidth / 2, y);
      } else if (shape === "oval") {
        ctx.moveTo(x - nailWidth / 2, y);
        ctx.bezierCurveTo(
          x - nailWidth / 2,
          y - nailHeight,
          x + nailWidth / 2,
          y - nailHeight,
          x + nailWidth / 2,
          y
        );
      } else if (shape === "squoval") {
        ctx.moveTo(x - nailWidth / 2, y);
        ctx.lineTo(x - nailWidth / 2, y - nailHeight);
        ctx.quadraticCurveTo(x, y - nailHeight - 5, x + nailWidth / 2, y - nailHeight);
        ctx.lineTo(x + nailWidth / 2, y);
      } else if (shape === "coffin") {
        ctx.moveTo(x - 9, y);
        ctx.lineTo(x - 11, y - nailHeight);
        ctx.lineTo(x + 11, y - nailHeight);
        ctx.lineTo(x + 9, y);
      }
      ctx.closePath();
      ctx.fill();
    };

    drawNail(100, 260);
    drawNail(170, 160);
    drawNail(210, 140);
    drawNail(250, 160);
    drawNail(290, 180);

    ctx.restore();

    // Draw stickers
    for (const { emoji, x, y, scale, rotation, imageUrl } of stickers) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      if (imageUrl) {
        let img: HTMLImageElement;
        if (imageCache.current.has(imageUrl)) {
          img = imageCache.current.get(imageUrl)!;
          if (img.complete) {
            const maxSize = 40;
            const ratio = Math.min(maxSize / img.width, maxSize / img.height);
            const width = img.width * ratio;
            const height = img.height * ratio;
            ctx.drawImage(img, -width / 2, -height / 2, width, height);
          }
        } else {
          img = new Image();
          img.src = imageUrl;
          imageCache.current.set(imageUrl, img);
          img.onload = () => {
            setStickers((prev) => [...prev]);
          };
        }
      } else {
        ctx.font = "20px serif";
        ctx.fillText(emoji ?? "", -10, 10);
      }
      ctx.restore();
    }
  }, [shape, length, color, stickers]);
}
