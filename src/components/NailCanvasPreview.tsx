import React, { useEffect, useRef, useState } from 'react';

interface Props {
  shape: 'almond' | 'oval' | 'squoval' | 'coffin';
  length: 'short' | 'medium' | 'long';
  color: string;
  stickers: Sticker[];               
  setStickers: React.Dispatch<React.SetStateAction<Sticker[]>>;
}

interface Sticker {
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const NailCanvasPreview = ({ shape, length, color }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);


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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData('sticker');
    const { x, y } = getMousePos(e);
    if (!emoji) return;
    
    if (soundRef.current) {
      soundRef.current.currentTime = 0; // 回到音效開頭
      soundRef.current.play().catch((err) => console.warn("Audio play failed:", err));
    }

    setStickers((prev) => [...prev, { emoji, x, y, scale: 1, rotation: 0 }]);
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
    setDraggingIndex(null);
  };

  // 滾輪縮放貼紙
  const handleWheel = (e: React.WheelEvent) => {
    if (draggingIndex === null) return;
    e.preventDefault();
    setStickers((prev) => {
      const updated = [...prev];
      const sticker = updated[draggingIndex];
      const delta = e.deltaY < 0 ? 0.05 : -0.05;
      const newScale = Math.max(0.3, Math.min(2, sticker.scale + delta));
      updated[draggingIndex] = { ...sticker, scale: newScale };
      return updated;
    });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    for (let i = stickers.length - 1; i >= 0; i--) {
      const sticker = stickers[i];
      const dist = Math.hypot(sticker.x - x, sticker.y - y);
      if (dist < 20) {
        setStickers((prev) => prev.filter((_, index) => index !== i));
        return;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
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
    ctx.fillStyle = '#FAD8C9';
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
      if (shape === 'almond') {
        ctx.moveTo(x - 10, y);
        ctx.quadraticCurveTo(x, y - nailHeight - 30, x + 8, y);
      } else if (shape === 'oval') {
        ctx.moveTo(x - 10, y);
        ctx.bezierCurveTo(x - 10, y - nailHeight, x + 10, y - nailHeight, x + 10, y);
      } else if (shape === 'squoval') {
        ctx.moveTo(x - 10, y);
        ctx.lineTo(x - 10, y - nailHeight);
        ctx.quadraticCurveTo(x, y - nailHeight - 5, x + 10, y - nailHeight);
        ctx.lineTo(x + 10, y);
      } else if (shape === 'coffin') {
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
      ctx.font = '20px serif';
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
      onWheel={handleWheel}
      className="w-full flex justify-center items-center"
    >
      <canvas
        ref={canvasRef}
        className="border rounded w-3/4 h-auto bg-white"
      />
      <audio ref={soundRef} src="/sounds/drum.wav" preload="auto" />
    </div>
    
  );
};

export default NailCanvasPreview;