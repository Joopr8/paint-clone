import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

interface ColorInputProps {
  iconClass?: string;
  title?: string;
  color: string;
  onClick: () => void;
  onSelectColor: (c: ColorResult) => void;
}

export default function ColorPicker({
  iconClass,
  title,
  color,
  onSelectColor,
}: ColorInputProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <>
      {iconClass && <i className={iconClass} title={title}></i>}
      <input
        type="text"
        readOnly
        value={color}
        className="color-input"
        onClick={() => setShowColorPicker(!showColorPicker)}
        style={{ backgroundColor: color }}
      />
      {showColorPicker && (
        <div style={{ position: "absolute", top: 50, left: 0 }}>
          <SketchPicker
            color={color}
            onChangeComplete={(color) => onSelectColor(color)}
          />
        </div>
      )}
    </>
  );
}
