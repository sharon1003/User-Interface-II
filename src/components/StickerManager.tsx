import React from "react";

interface StickerManagerProps {
  customStickers: { emoji: string; imageUrl: string }[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStickerDrag: (
    imageUrl: string,
    emoji: string
  ) => (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  t: (key: string) => string;
}

const StickerManager: React.FC<StickerManagerProps> = ({
  customStickers,
  onFileUpload,
  onStickerDrag,
  fileInputRef,
  t,
}) => (
  <>
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-200 rounded shadow hover:bg-blue-300 active:scale-95 transition"
      >
        {t("customize.uploadSticker")}
      </button>
    </div>
    <input
      type="file"
      ref={fileInputRef}
      onChange={onFileUpload}
      accept="image/*"
      className="hidden"
    />
    {customStickers.length > 0 && (
      <div className="mt-4 w-3/4">
        <h3 className="text-sm font-medium mb-2">
          {t("customize.myStickers")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {customStickers.map((sticker, index) => (
            <div
              key={index}
              draggable
              onDragStart={onStickerDrag(sticker.imageUrl, sticker.emoji)}
              className="w-12 h-12 border rounded flex items-center justify-center bg-white cursor-grab hover:border-blue-400"
            >
              <img
                src={sticker.imageUrl}
                alt="Custom sticker"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

export default StickerManager;
