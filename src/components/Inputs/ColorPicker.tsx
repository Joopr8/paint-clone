import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { usePaint } from "../../hooks/usePaint";
import { Tool } from "../../types/PaintTypes";
import styles from "./Input.module.css";

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
  const { paintState } = usePaint();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const inputValue =
    isColorBrush && paintState.tool === Tool.ERASER ? "ERASE MODE" : "";

  return (
    <>
      <div className={styles.pickerWrapper}>
        {iconClass && <i className={iconClass} title={title}></i>}
        <input
          type="text"
          readOnly
          value={inputValue}
          className={styles.colorInput}
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{ backgroundColor: color }}
        />
        {showColorPicker && (
          <div className={styles.inputPanel}>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => onSelectColor(color)}
            />
          </div>
        )}
      </div>
    </>
  );
}
