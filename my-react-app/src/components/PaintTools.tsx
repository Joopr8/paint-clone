import { useState } from "react";

import { usePaint } from "../hooks/usePaint";
import { BrushSettings, Tool } from "../context/PaintContext";
import ColorPicker from "./ColorPicker";
import { Line } from "../types/paint.types";

export default function PaintTools() {
  const {
    brushSettings,
    setBrushSettings,
    backgroundColor,
    setBackgroundColor,
    canvasRef,
    setTool,
  } = usePaint();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);

  function updateBrushColor(color: string) {
    setBrushSettings((prevState: BrushSettings) => ({
      ...prevState,
      brushColor: color,
    }));
    setTool(Tool.BRUSH);
  }

  function updateBackgroundColor(newBackgroundColor: string) {
    removeEraserStrokes(backgroundColor, newBackgroundColor);
    setBackgroundColor(newBackgroundColor);
  }

  function removeEraserStrokes(oldBackground: string, newBackground: string) {
    if (canvasRef.current) {
      const saveData = JSON.parse(canvasRef.current.getSaveData());

      if (
        saveData.lines.some((line: Line) => line.brushColor === oldBackground)
      ) {
        saveData.lines = saveData.lines.map((line: Line) =>
          line.brushColor === oldBackground
            ? { ...line, brushColor: newBackground }
            : line
        );

        canvasRef.current.loadSaveData(JSON.stringify(saveData), true);
      }
    }
  }

  return (
    <div className="brush tool">
      <ColorPicker
        iconClass="fas fa-brush"
        title="Brush"
        color={brushSettings.brushColor}
        onClick={() => setShowColorPicker(!showColorPicker)}
        onSelectColor={(c) => updateBrushColor(c.hex)}
        isColorBrush
      />

      <ColorPicker
        iconClass="fas fa-fill-drip"
        title="Background Color"
        color={backgroundColor}
        onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
        onSelectColor={(c) => updateBackgroundColor(c.hex)}
      />
      <span className="size" title="Brush Size">
        {brushSettings.brushSize}
      </span>
      <input
        type="range"
        min="1"
        max="50"
        value={brushSettings.brushSize}
        onChange={(e) =>
          setBrushSettings((prev) => ({
            ...prev,
            brushSize: e.target.value,
          }))
        }
        className="slider"
        id="brush-slider"
      />
    </div>
  );
}
