import { useState } from "react";

import { usePaint } from "../hooks/usePaint";
import { BrushSettings } from "../context/PaintContext";
import ColorPicker from "./ColorPicker";

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
    setBackgroundColor(color);
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
