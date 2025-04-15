import React, { useEffect, useRef } from 'react';

// import image
import almond from '/assets/almond.png';
import round from '../assets/round.png';
import squoval from '../assets/squoval.png';
import coffin from '../assets/coffin.png';

interface Props {
  shape: 'almond' | 'oval' | 'squoval' | 'coffin';
  length: 'short' | 'medium' | 'long';
  color: string;
}

const shapeMap: Record<string, string> = {
  almond,
  oval: round,
  squoval,
  coffin,
};

const NailPreview = ({ shape, length, color }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const image = new Image();
    image.src = shapeMap[shape];

    image.onload = () => {
      const fixedWidth = 240;
      const aspectRatio = image.height / image.width;
      const fixedHeight = fixedWidth * aspectRatio;

      canvas.width = fixedWidth;
      canvas.height = fixedHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cropRatios = {
        short: 0.6,
        medium: 0.8,
        long: 1.0,
      };

      const ratio = cropRatios[length];
      const srcHeight = image.height * ratio;
      const destHeight = fixedHeight * ratio;

      // 繪製原始圖片的下部（根據長度）
      ctx.drawImage(
        image,
        0, image.height - srcHeight,
        image.width, srcHeight,
        0, fixedHeight - destHeight,
        fixedWidth, destHeight
      );

      // 疊加顏色
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3; 
      ctx.fillRect(0, fixedHeight - destHeight, fixedWidth, destHeight);
      ctx.globalAlpha = 1.0;
    };
  }, [shape, length, color]);

  return (
    <div className="w-full flex justify-center items-center">
      <canvas ref={canvasRef} className="border rounded max-w-full h-auto" />
    </div>
  );
};

export default NailPreview;


// import React, { useEffect, useRef } from 'react';

// // 匯入所有圖片
// import almond from '../assets/almond.png';
// import round from '../assets/round.png';
// import squoval from '../assets/squoval.png';
// import coffin from '../assets/coffin.png';

// interface Props {
//   shape: 'almond' | 'oval' | 'squoval' | 'coffin';
//   length: 'short' | 'medium' | 'long';
// }

// const shapeMap: Record<string, string> = {
//   almond,
//   oval: round,
//   squoval,
//   coffin,
// };

// const NailPreview = ({ shape, length }: Props) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     if (!canvas || !ctx) return;

//     const image = new Image();
//     image.src = shapeMap[shape];

//     image.onload = () => {
//       const width = image.width;
//       const height = image.height;

//       canvas.width = width;
//       canvas.height = height;

//       ctx.clearRect(0, 0, width, height);

//       const cropRatios = {
//         short: 0.6,
//         medium: 0.8,
//         long: 1.0,
//       };

//       const ratio = cropRatios[length];
//       const displayHeight = height * ratio;

//       ctx.drawImage(
//         image,
//         0, height - displayHeight,
//         width, displayHeight,
//         0, height - displayHeight,
//         width, displayHeight
//       );
//     };
//   }, [shape, length]);

//   return (
//     <div className="w-full flex justify-center items-center">
//       <canvas ref={canvasRef} className="border rounded max-w-full h-auto" />
//     </div>
//   );
// };

// export default NailPreview;


// import React from 'react';

// // 匯入圖片（假設你使用 import 方式）
// import almondShort from '../assets/almond.png';
// import almondMedium from '../assets/almond.png';
// import almondLong from '../assets/almond.png';
// import ovalShort from '../assets/round.png';
// import ovalMedium from '../assets/round.png';
// import ovalLong from '../assets/round.png';
// import ovalShort from '../assets/squoval.png';
// import SquovalMedium from '../assets/squoval.png';
// import SquovalLong from '../assets/squoval.png';
// import CoffinShort from '../assets/coffin.png';
// import CoffinMedium from '../assets/coffin.png';
// import CoffinLong from '../assets/coffin.png';

// // ...依此類推補上其他 shape + length 的圖

// import { useEffect, useRef } from 'react';

// interface Props {
//   shape: 'almond' | 'oval' | 'squoval' | 'coffin';
//   length: 'short' | 'medium' | 'long';
// }

// const NailPreview = ({ shape, length }: Props) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     if (!canvas || !ctx) return;

//     const image = new Image();
//     image.src = almondLong; // 這張圖放在 public 目錄

//     image.onload = () => {
//       const width = image.width;
//       const height = image.height;

//       canvas.width = width;
//       canvas.height = height;

//       ctx.clearRect(0, 0, width, height);

//       // 根據選擇的長度，設定要顯示的圖像部分（從底部往上裁）
//       const cropRatios = {
//         short: 0.6,
//         medium: 0.8,
//         long: 1.0,
//       };

//       const ratio = cropRatios[length];
//       const displayHeight = height * ratio;

//       ctx.drawImage(
//         image,
//         0, height - displayHeight, // src x, y
//         width, displayHeight,      // src width, height
//         0, height - displayHeight, // dest x, y
//         width, displayHeight       // dest width, height
//       );
//     };
//   }, [length]);

//   return (
//     <div className="w-full flex justify-center items-center">
//       <canvas ref={canvasRef} className="border rounded max-w-full h-auto" />
//     </div>
//   );
// };

// export default NailPreview;



// type Props = {
//   shape: 'almond' | 'oval' | 'squoval' | 'coffin';
//   length: 'short' | 'medium' | 'long';
// };

// const imageMap = {
//   almond: {
//     short: almondShort,
//     medium: almondMedium,
//     long: almondLong,
//   },
//   oval: {
//     short: ovalShort,
//     medium: ovalMedium,
//     long: ovalLong,
//   },
//   // squoval: { ... }, coffin: { ... } 你也可以加上
// };

// const NailPreview: React.FC<Props> = ({ shape, length }) => {
//   const previewImage = imageMap[shape]?.[length];

//   return (
//     <div className="w-full flex justify-center items-center min-h-[200px]">
//       {previewImage ? (
//         <img
//           src={previewImage}
//           alt={`${shape} ${length}`}
//           className="w-40 h-auto object-contain"
//         />
//       ) : (
//         <p className="text-gray-500">No preview available.</p>
//       )}
//     </div>
//   );
// };

// export default NailPreview;



// import { useState } from "react";

// interface NailPreviewProps {
//   color: string;
//   pattern: string;
// }

// const NailPreview: React.FC<NailPreviewProps> = ({ color, pattern }) => {
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);
//   const [start, setStart] = useState({ x: 0, y: 0 });

//   const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
//     setDragging(true);
//     setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!dragging) return;
//     setOffset({
//       x: e.clientX - start.x,
//       y: e.clientY - start.y,
//     });
//   };

//   const handleMouseUp = () => setDragging(false);

//   return (
//     <div
//       className="flex justify-center gap-4 flex-wrap"
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp}
//     >
//       {Array.from({ length: 5 }).map((_, index) => (
//         <div
//           key={index}
//           className="relative w-24 h-24"
//         >
//           {/* 底色塗層 */}
//           <div
//             className="absolute inset-0 rounded-full"
//             style={{ backgroundColor: color || "#eee" }}
//           ></div>

//           {/* 指甲 base 圖片 */}
//           <img
//             src="/images/nails/nail_base.png"
//             alt="base"
//             className="absolute inset-0 w-full h-full z-10"
//             onError={(e) => {
//               console.error("nail_base.png 讀取失敗");
//               e.currentTarget.style.display = "none";
//             }}
//           />

//           {/* 圖案圖層 */}
//           {pattern && (
//             <img
//               src={`/images/patterns/${pattern}.png`}
//               alt="pattern"
//               className="absolute w-10 h-10 cursor-move z-20"
//               style={{ top: offset.y, left: offset.x }}
//               onMouseDown={handleMouseDown}
//             />
//           )}

//           {/* 光澤圖層 */}
//           <img
//             src="/images/nails/overlay_gloss.png"
//             alt="gloss"
//             className="absolute inset-0 w-full h-full z-30"
//             onError={(e) => {
//               console.error("overlay_gloss.png 讀取失敗");
//               e.currentTarget.style.display = "none";
//             }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NailPreview;
