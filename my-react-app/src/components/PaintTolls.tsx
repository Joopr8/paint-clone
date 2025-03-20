import { useState } from "react";

import { usePaint } from "../hooks/usePaint";
import { BrushSettings, Tool } from "../context/PaintContext";
import ColorPicker from "./ColorPicker";

type Point = { x: number; y: number };

interface Line {
  brushColor: string;
  brushRadius: number;
  points: Point[];
}

export default function PaintTolls() {
  const {
    brushSettings,
    setBrushSettings,
    backgroundColor,
    setBackgroundColor,
    canvasRef,
    setTool,
  } = usePaint();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackgroundPicker, setBackgroundColorPicker] = useState(false);

  const updateBrushColor = (color: string) => {
    setBrushSettings((prevState: BrushSettings) => ({
      ...prevState,
      brushColor: color,
    }));
    setTool(Tool.BRUSH);
  };

  const updateBackgroundColor = (newBackgroundColor: string) => {
    removeEraserStrokes(backgroundColor, newBackgroundColor);
    setBackgroundColor(newBackgroundColor);
  };

  const removeEraserStrokes = (
    oldBackground: string,
    newBackground: string
  ) => {
    if (!canvasRef.current) return;

    const saveDataStr = canvasRef.current.getSaveData();
    const saveData = JSON.parse(saveDataStr);

    const updatedLines = saveData.lines.map((line: Line) =>
      line.brushColor === oldBackground
        ? { ...line, brushColor: newBackground }
        : line
    );

    const cleanedSaveData = {
      ...saveData,
      lines: updatedLines,
    };

    canvasRef.current.loadSaveData(JSON.stringify(cleanedSaveData), true);
  };

  return (
    <>
      <div className="brush tool">
        <ColorPicker
          iconClass="fas fa-brush"
          title="Brush"
          color={brushSettings.brushColor}
          onClick={() => setShowColorPicker(!showColorPicker)}
          onSelectColor={(c) => updateBrushColor(c.hex)}
        />

        <ColorPicker
          iconClass="fas fa-fill-drip"
          title="Background Color"
          color={backgroundColor}
          onClick={() => setBackgroundColorPicker(!showBackgroundPicker)}
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
            setBrushSettings({ ...brushSettings, brushSize: e.target.value })
          }
          className="slider"
          id="brush-slider"
        />
        {/* {showColorPicker && (
          <div style={{ marginTop: 10 }}>
            <SketchPicker
              color={brushSettings.brushColor}
              onChangeComplete={(c: ColorResult) => updateBrushColor(c.hex)}
            />
          </div>
        )}
        {showBackgroundPicker && (
          <div style={{ marginTop: 10 }}>
            <SketchPicker
              color={backgroundColor}
              onChangeComplete={(c: ColorResult) =>
                updateBackgroundColor(c.hex)
              }
            />
          </div>
        )} */}
      </div>
    </>
  );
}
