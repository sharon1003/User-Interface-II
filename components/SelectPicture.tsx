const SelectPicture = () => {
    const stickerOptions = ['🌸', '✨', '💫', '🖤', '🍓'];
  
    return (
      <div className="flex gap-4 flex-wrap justify-center">
        {stickerOptions.map((sticker) => (
            <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData('sticker', sticker)}
            className="text-3xl cursor-move"
            >
            {sticker}
            </div>
        ))}
      </div>
    );
  };
  
  export default SelectPicture;
  