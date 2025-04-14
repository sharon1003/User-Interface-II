import React, { useEffect, useRef } from 'react';

interface Props {
  shape: 'almond' | 'oval' | 'squoval' | 'coffin';
  length: 'short' | 'medium' | 'long';
  color: string;
}

const NailCanvasPreview = ({ shape, length, color }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const width = 500;
    const height = 500;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    const lengthRatio = {
      short: 0.4,
      medium: 0.6,
      long: 0.85,
    }[length];

    const nailHeight = height * 0.1 * lengthRatio;

    // draw stylized left hand outline (cleaner shape)
    ctx.fillStyle = '#FAD8C9';
    ctx.beginPath();
    ctx.moveTo(150, 450); // bottom left
    ctx.quadraticCurveTo(100, 400, 120, 330); // thumb base
    ctx.lineTo(120, 240);
    ctx.quadraticCurveTo(130, 220, 145, 240);
    ctx.lineTo(145, 300);

    ctx.lineTo(160, 180);
    ctx.quadraticCurveTo(170, 160, 180, 180);
    ctx.lineTo(180, 300);

    ctx.lineTo(200, 160);
    ctx.quadraticCurveTo(210, 140, 220, 160);
    ctx.lineTo(220, 300);

    ctx.lineTo(240, 180);
    ctx.quadraticCurveTo(250, 160, 260, 180);
    ctx.lineTo(260, 300);

    ctx.lineTo(280, 200);
    ctx.quadraticCurveTo(290, 180, 300, 200);
    ctx.lineTo(300, 330);

    ctx.quadraticCurveTo(310, 420, 260, 450);
    ctx.closePath();
    ctx.fill();

    // draw nails aligned better to fingertips
    ctx.fillStyle = color;

    const drawNail = (x: number, y: number) => {
      ctx.beginPath();
      if (shape === 'almond') {
        ctx.moveTo(x - 10, y);
        ctx.quadraticCurveTo(x, y - nailHeight - 10, x + 10, y);
      } else if (shape === 'oval') {
        ctx.moveTo(x - 10, y);
        ctx.bezierCurveTo(x - 5, y - nailHeight, x + 5, y - nailHeight, x + 10, y);
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

    drawNail(170, 180); // index
    drawNail(210, 160); // middle
    drawNail(250, 180); // ring
    drawNail(290, 200); // pinky
    drawNail(135, 240); // thumb
  }, [shape, length, color]);

  return (
    <div className="w-full flex justify-center items-center">
      <canvas ref={canvasRef} className="border rounded max-w-full h-auto bg-white" />
    </div>
  );
};

export default NailCanvasPreview;