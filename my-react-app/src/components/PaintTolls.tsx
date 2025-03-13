import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { usePaint } from "../hooks/usePaint";
import { BrushSettings } from "../context/PaintContext";

export default function PaintTolls() {
  const { brushSettings, setBrushSettings } = usePaint();
  const [showPicker, setShowPicker] = useState(false);

  const updateColor = (color: string) => {
    setBrushSettings((prevState: BrushSettings) => ({
      ...prevState,
      brushColor: color,
    }));
  };

  return (
    <>
      <div className="brush tool">
        <i className="fas fa-brush" id="brush" title="Brush"></i>
        <input
          type="text"
          value={brushSettings.brushColor}
          readOnly
          onClick={() => setShowPicker(!showPicker)}
          style={{
            width: "120px",
            padding: "8px",
            backgroundColor: brushSettings.brushColor,
            border: "1px solid #ccc",
            color: "#fff",
            cursor: "pointer",
          }}
        />
        <span className="size" id="brush-size" title="Brush Size">
          {brushSettings.brushSize}
        </span>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSettings.brushSize}
          onChange={(e) => {
            console.log(typeof e.target.value);
            setBrushSettings({ ...brushSettings, brushSize: e.target.value });
          }}
          className="slider"
          id="brush-slider"
        />

        {showPicker && (
          <div style={{ marginTop: 10 }}>
            <SketchPicker
              color={brushSettings.brushColor}
              onChangeComplete={(c: ColorResult) => updateColor(c.hex)}
            />
          </div>
        )}
      </div>
    </>
  );
}
