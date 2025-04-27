import React, { useEffect, useRef, useState } from 'react';

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

// Define nail positions for right hand
const RIGHT_HAND_NAILS = [
  { x: 45, y: 480, width: 35, angle: -0.3 },   // Right thumb
  { x: 140, y: 250, width: 40, angle: 0 },      // Right index finger
  { x: 245, y: 210, width: 44, angle: 0 },      // Right middle finger
  { x: 345, y: 250, width: 40, angle: 0 },      // Right ring finger
  { x: 420, y: 330, width: 36, angle: 0.2 },      // Right pinky
];

// We'll use the right hand
const NAIL_POSITIONS = RIGHT_HAND_NAILS;

const NailCanvasPreview = ({ shape, length, color, step }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const deleteSoundRef = useRef<HTMLAudioElement | null>(null);
  const redoSoundRef = useRef<HTMLAudioElement | null>(null);
  const undoSoundRef = useRef<HTMLAudioElement | null>(null);

  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [undoStack, setUndoStack] = useState<Sticker[][]>([]);
  const [redoStack, setRedoStack] = useState<Sticker[][]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [handImageLoaded, setHandImageLoaded] = useState(false);

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

    // Set canvas dimensions
    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    // Create and load the hand image
    const handImage = new Image();
    
    // Set image URL - this should point to your saved hand image
    // We need to save the provided image to the public directory
    handImage.src = '/images/right-hand.png'; // Change to right hand image path

    handImage.onload = () => {
      setHandImageLoaded(true);
      
      // Calculate scaling ratio to fit the image within the canvas
      const scale = Math.min(width / handImage.width, height / handImage.height) * 0.9;
      
      // Calculate offsets to center the image
      const offsetX = (width - handImage.width * scale) / 2;
      const offsetY = (height - handImage.height * scale) / 2;
      
      // Draw the hand image
      ctx.drawImage(
        handImage, 
        0, 0, handImage.width, handImage.height, 
        offsetX, offsetY, handImage.width * scale, handImage.height * scale
      );
      
      // Set nail length ratio based on selected length
      const lengthRatio = {
        short: 2.0,
        medium: 2.6,
        long: 3.2,
      }[length];

      // Draw nails - adjust positions according to scaling and offset
      NAIL_POSITIONS.forEach(({ x, y, width: nailWidth, angle }) => {
        // Adjust nail position to match the scaled hand
        const adjustedX = x * scale + offsetX;
        const adjustedY = y * scale + offsetY;
        const adjustedWidth = nailWidth * scale;
        
        drawNail(adjustedX, adjustedY, adjustedWidth, adjustedWidth * lengthRatio, angle);
      });
      
      // Draw stickers
      stickers.forEach(({ emoji, x, y, scale: stickerScale, rotation }) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(stickerScale, stickerScale);
        ctx.font = '20px serif';
        ctx.fillText(emoji, -10, 10);
        ctx.restore();
      });

      // Debug: Draw circles at nail positions to help with alignment
      // Comment this out when positions are correct
      /*
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      NAIL_POSITIONS.forEach(({ x, y }) => {
        const adjustedX = x * scale + offsetX;
        const adjustedY = y * scale + offsetY;
        ctx.beginPath();
        ctx.arc(adjustedX, adjustedY, 5, 0, Math.PI * 2);
        ctx.fill();
      });
      */
    };
    
    handImage.onerror = (err) => {
      console.error('Failed to load hand image:', err);
      
      // Fallback if image fails to load
      ctx.fillStyle = '#f5d0b9';
      ctx.fillRect(50, 100, 300, 200);
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.fillText('Hand image failed to load', 100, 200);
    };
    
    // Function to draw nails
    function drawNail(x: number, y: number, width: number, height: number, angle: number = 0) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      ctx.fillStyle = color;
      ctx.beginPath();
      
      if (shape === 'almond') {
        // Almond shape
        ctx.moveTo(-width/2, 0);
        ctx.quadraticCurveTo(0, -height - 5, width/2, 0);
        ctx.closePath();
      } else if (shape === 'oval') {
        // Oval shape
        ctx.ellipse(0, -height/2, width/2, height/2, 0, 0, Math.PI * 2);
      } else if (shape === 'squoval') {
        // Squoval shape (squared oval)
        const radius = height / 4;
        ctx.moveTo(-width/2, 0);
        ctx.lineTo(-width/2, -height + radius);
        ctx.quadraticCurveTo(-width/2, -height, -width/2 + radius, -height);
        ctx.lineTo(width/2 - radius, -height);
        ctx.quadraticCurveTo(width/2, -height, width/2, -height + radius);
        ctx.lineTo(width/2, 0);
        ctx.closePath();
      } else if (shape === 'coffin') {
        // Coffin shape
        ctx.moveTo(-width/2, 0);
        ctx.lineTo(-width/3, -height);
        ctx.lineTo(width/3, -height);
        ctx.lineTo(width/2, 0);
        ctx.closePath();
      }
      
      ctx.fill();
      
      // Add glossy effect to the nail
      const gradient = ctx.createLinearGradient(0, -height, 0, 0);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.restore();
    }
  }, [shape, length, color, stickers, handImageLoaded]);

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
      <canvas ref={canvasRef} className="border rounded w-3/4 h-auto bg-white" />
      {step === 4 && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={undo}
            className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 active:scale-95 transition"
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 active:scale-95 transition"
          >
            Redo
          </button>
        </div>
      )}
      <audio ref={soundRef} src="/sounds/drum.wav" preload="auto" />
      <audio ref={deleteSoundRef} src="/sounds/delete.wav" preload="auto" />
      <audio ref={undoSoundRef} src="/sounds/undo.wav" preload="auto" />
      <audio ref={redoSoundRef} src="/sounds/redo.wav" preload="auto" />
    </div>
  );
};

export default NailCanvasPreview;