import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";

interface Props {
  shape: 'almond' | 'oval' | 'squoval' | 'coffin';
  length: 'short' | 'medium' | 'long';
  color: string;
  step: number;
}

interface Sticker {
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

// Interface for nail position with rotation angle
interface NailPosition {
  x: number;
  y: number;
  rotation: number; // Rotation angle in degrees
}

const NailCanvasPreview = ({ shape, length, color, step }: Props) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const deleteSoundRef = useRef<HTMLAudioElement | null>(null);
  const redoSoundRef = useRef<HTMLAudioElement | null>(null);
  const undoSoundRef = useRef<HTMLAudioElement | null>(null);
  const rotateNailSoundRef = useRef<HTMLAudioElement | null>(null);

  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [undoStack, setUndoStack] = useState<Sticker[][]>([]);
  const [redoStack, setRedoStack] = useState<Sticker[][]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  
  const [nailWidth] = useState(25); 
  const [nailScale] = useState(1); 

  // New nail positions with initial rotation angles
  const [nailPositions, setNailPositions] = useState<NailPosition[]>([
    { x: 40, y: 200, rotation: -30 }, // thumb
    { x: 110, y: 106, rotation: 0 }, // index
    { x: 195, y: 90, rotation: 0 }, // middle
    { x: 273, y: 106, rotation: 0 }, // ring
    { x: 335, y: 145, rotation: 20 }, // pinky
  ]);
  
  // Track which nail is currently being rotated
  const [selectedNailIndex, setSelectedNailIndex] = useState<number | null>(null);
  // Track the starting angle for rotation calculation
  const [startAngle, setStartAngle] = useState<number>(0);

  const playSound = (ref: React.RefObject<HTMLAudioElement>) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.play().catch((err) => console.warn('Audio play failed:', err));
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
    const emoji = e.dataTransfer.getData('sticker');
    const { x, y } = getMousePos(e);
    if (!emoji) return;

    playSound(soundRef);
    updateStickers([...stickers, { emoji, x, y, scale: 0.6, rotation: 0 }]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    
    // First check if we clicked on a sticker
    for (let i = stickers.length - 1; i >= 0; i--) {
      const sticker = stickers[i];
      const dist = Math.hypot(sticker.x - x, sticker.y - y);
      if (dist < 20) {
        setDraggingIndex(i);
        return;
      }
    }
    
    // If no sticker was clicked, check if we clicked on a nail
    for (let i = 0; i < nailPositions.length; i++) {
      const nail = nailPositions[i];
      const dist = Math.hypot(nail.x - x, nail.y - y);
      if (dist < 30) { // Adjust this radius as needed
        setSelectedNailIndex(i);
        // Store the current angle from center of nail to mouse position
        const angle = Math.atan2(y - nail.y, x - nail.x) * (180 / Math.PI);
        setStartAngle(angle);
        playSound(rotateNailSoundRef);
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    
    // Handle sticker dragging
    if (draggingIndex !== null) {
      setStickers((prev) => {
        const updated = [...prev];
        updated[draggingIndex] = { ...updated[draggingIndex], x, y };
        return updated;
      });
    }
    
    // Handle nail rotation
    else if (selectedNailIndex !== null) {
      const nail = nailPositions[selectedNailIndex];
      
      // Calculate new angle
      const currentAngle = Math.atan2(y - nail.y, x - nail.x) * (180 / Math.PI);
      const deltaAngle = currentAngle - startAngle;
      
      // Update the nail rotation
      setNailPositions((prev) => {
        const updated = [...prev];
        const newRotation = (nail.rotation + deltaAngle) % 360;
        updated[selectedNailIndex] = { ...nail, rotation: newRotation };
        return updated;
      });
      
      // Update the start angle for the next move
      setStartAngle(currentAngle);
    }
  };

  const handleMouseUp = () => {
    if (draggingIndex !== null) {
      setUndoStack((prev) => [...prev, stickers]);
    }
    setDraggingIndex(null);
    setSelectedNailIndex(null);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    for (let i = stickers.length - 1; i >= 0; i--) {
      const sticker = stickers[i];
      const dist = Math.hypot(sticker.x - x, sticker.y - y);
      if (dist < 20) {
        playSound(deleteSoundRef);
        updateStickers(stickers.filter((_, index) => index !== i));
        return;
      }
    }
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const last = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, stickers]);
    setStickers(last);
    playSound(undoSoundRef);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, stickers]);
    setStickers(next);
    playSound(redoSoundRef);
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

    // Load hand background image
    const handImage = new Image();
    handImage.src = 'images/right-hand.png'; // Add this image to your assets
    
    handImage.onload = () => {
      // Draw the hand background
      ctx.drawImage(handImage, 0, 0, width, height);
      
      // Draw nails with rotation
      drawNails(ctx);
      
      // Draw stickers
      stickers.forEach(({ emoji, x, y, scale, rotation }) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scale, scale);
        ctx.font = '20px serif';
        ctx.fillText(emoji, 0, 0);
        ctx.restore();
      });

    };
    
    // Fallback to drawing if image fails to load
    handImage.onerror = () => {
      console.error("Hand image failed to load, falling back to drawn hand");
      drawHand(ctx);
      drawNails(ctx);
      
      // Draw stickers
      stickers.forEach(({ emoji, x, y, scale, rotation }) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scale, scale);
        ctx.font = '20px serif';
        ctx.fillText(emoji, 0, 0);
        ctx.restore();
      });
    };
  }, [shape, length, color, stickers, nailPositions, nailWidth, nailScale]); // Added nailPositions as dependency

  // Function to draw the hand (fallback)
  const drawHand = (ctx: CanvasRenderingContext2D) => {
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
  };

  // Function to draw nails with rotation
  const drawNails = (ctx: CanvasRenderingContext2D) => {
    const lengthRatio = {
      short: 0.4,
      medium: 0.8,
      long: 1.2,
    }[length];
  
    const nailHalfWidth = (nailWidth * nailScale) / 2;
    const nailHeight = 50 * lengthRatio * nailScale;
    
    ctx.fillStyle = color;
  
    nailPositions.forEach((nail) => {
      ctx.save();
      ctx.translate(nail.x, nail.y);
      ctx.rotate(nail.rotation * Math.PI / 180);
      
      ctx.beginPath();
      if (shape === 'almond') {
        ctx.moveTo(-nailHalfWidth, 0);
        ctx.quadraticCurveTo(0, -nailHeight - 30 * nailScale, nailHalfWidth, 0);
      } else if (shape === 'oval') {
        ctx.moveTo(-nailHalfWidth, 0);
        ctx.bezierCurveTo(-nailHalfWidth, -nailHeight, nailHalfWidth, -nailHeight, nailHalfWidth, 0);
      } else if (shape === 'squoval') {
        ctx.moveTo(-nailHalfWidth, 0);
        ctx.lineTo(-nailHalfWidth, -nailHeight);
        ctx.quadraticCurveTo(0, -nailHeight - 5 * nailScale, nailHalfWidth, -nailHeight);
        ctx.lineTo(nailHalfWidth, 0);
      } else if (shape === 'coffin') {
        const narrowFactor = 0.8; 
        ctx.moveTo(-nailHalfWidth * 0.6, 0);
        ctx.lineTo(-nailHalfWidth * narrowFactor, -nailHeight);
        ctx.lineTo(nailHalfWidth * narrowFactor, -nailHeight);
        ctx.lineTo(nailHalfWidth * 0.6, 0);
      }
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    });
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Also handle mouse leaving the canvas
      onDoubleClick={handleDoubleClick}
      className="w-full flex flex-col justify-center items-center"
    >
      <canvas ref={canvasRef} className="border rounded w-3/4 h-auto bg-white" />
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
      <audio ref={soundRef} src="/sounds/drum.wav" preload="auto" />
      <audio ref={deleteSoundRef} src="/sounds/delete.wav" preload="auto" />
      <audio ref={undoSoundRef} src="/sounds/undo.wav" preload="auto" />
      <audio ref={redoSoundRef} src="/sounds/redo.wav" preload="auto" />
      <audio ref={rotateNailSoundRef} src="/sounds/rotate.wav" preload="auto" />
    </div>
  );
};

export default NailCanvasPreview;