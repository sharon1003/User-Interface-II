import { stickerPrices } from "../constants";

const SelectPicture = () => {
  const stickerOptions = ["🌸", "✨", "💫", "🖤", "🍓"];

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {stickerOptions.map((sticker) => (
        <div key={sticker} className="text-center">
          <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData("sticker", sticker)}
            className="text-3xl cursor-move"
          >
            {sticker}
          </div>
          {/* Display the price below the sticker */}
          <p className="text-sm text-gray-500 mt-1">
            +${stickerPrices[sticker].toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SelectPicture;
