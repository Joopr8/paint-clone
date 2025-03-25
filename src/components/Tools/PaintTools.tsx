import { useCallback, useState } from "react";
import { usePaint } from "../../hooks/usePaint";
import { PaintState, Tool } from "../../types/PaintTypes";
import ColorPicker from "../Inputs/ColorPicker";
import { Line } from "../../types/PaintTypes";
import styles from "./PaintTools.module.css";
import SliderInput from "../Inputs/SliderInput";

export default function PaintTools() {
  const {
    canvasRef,
    setPaintState,
    paintState,
    setBackgroundColor,
    setBrushSettings,
  } = usePaint();

  const { backgroundColor, brushSettings } = paintState;

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);

  const removeEraserStrokes = useCallback(
    (oldBackground: string, newBackground: string) => {
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
    },
    [canvasRef]
  );

  const updateBrushColor = useCallback(
    (color: string) => {
      setPaintState((prevState: PaintState) => ({
        ...prevState,
        tool: Tool.BRUSH,
        brushSettings: {
          ...prevState.brushSettings,
          brushColor: color,
        },
      }));
    },
    [setPaintState]
  );

  const updateBackgroundColor = useCallback(
    (newBackgroundColor: string) => {
      removeEraserStrokes(backgroundColor, newBackgroundColor);
      setBackgroundColor(newBackgroundColor);
    },
    [backgroundColor, setBackgroundColor, removeEraserStrokes]
  );

  return (
    <div className={styles.brush}>
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
      <SliderInput
        value={brushSettings.brushSize}
        onSelectRange={(newValue) =>
          setBrushSettings({
            ...brushSettings,
            brushSize: newValue,
          })
        }
      />
    </div>
  );
}
