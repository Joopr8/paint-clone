import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { usePaint } from "../hooks/usePaint";
import { Tool } from "../context/PaintContext";

interface ColorInputProps {
  iconClass?: string;
  title?: string;
  color: string;
  onClick: () => void;
  onSelectColor: (c: ColorResult) => void;
  isColorBrush?: boolean;
}

export default function ColorPicker({
  iconClass,
  title,
  color,
  onSelectColor,
  isColorBrush,
}: ColorInputProps) {
  const { tool } = usePaint();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const inputValue = isColorBrush && tool === Tool.ERASER ? "ERASE MODE" : "";

  return (
    <>
      {iconClass && <i className={iconClass} title={title}></i>}
      <input
        type="text"
        readOnly
        value={inputValue}
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
