import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { usePaint } from "../hooks/usePaint";
import { BrushSettings } from "../context/PaintContext";

export default function PaintTolls() {
  const {
    brushSettings,
    setBrushSettings,
    backgroundColor,
    setBackgroundColor,
  } = usePaint();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackgroundPicker, setBackgroundColorPicker] = useState(false);

  const updateBrushColor = (color: string) => {
    setBrushSettings((prevState: BrushSettings) => ({
      ...prevState,
      brushColor: color,
    }));
  };

  const updateBackgroundColor = (color: string) => {
    console.log(color);
    setBackgroundColor(color);
  };

  return (
    <>
      <div className="brush tool">
        <i className="fas fa-brush" title="Brush"></i>
        <input
          type="text"
          value={brushSettings.brushColor}
          readOnly
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{
            width: "120px",
            padding: "8px",
            backgroundColor: brushSettings.brushColor,
            border: "1px solid #ccc",
            color: "#fff",
            cursor: "pointer",
          }}
        />
        <i className="fas fa-fill-drip" title="Background Color"></i>
        <input
          type="text"
          value={backgroundColor}
          readOnly
          onClick={() => setBackgroundColorPicker(!showBackgroundPicker)}
          style={{
            width: "120px",
            padding: "8px",
            backgroundColor: backgroundColor,
            border: "1px solid #ccc",
            color: "#fff",
            cursor: "pointer",
          }}
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
        {showColorPicker && (
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
        )}
      </div>
    </>
  );
}
