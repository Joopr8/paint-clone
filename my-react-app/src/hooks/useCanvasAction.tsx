// src/hooks/useCanvasActions.ts
import { usePaint } from "../hooks/usePaint";
import { saveDrawing, loadDrawing } from "../utils/drawingStorage";
import { Action, Tool } from "../context/PaintContext";

export function useCanvasActions() {
  const { canvasRef, paintState, setBrushSettings, setTool, triggerAction } =
    usePaint();

  const { backgroundColor, brushSettings } = paintState;

  const erase = () => {
    setBrushSettings({ ...brushSettings, brushColor: backgroundColor });
    setTool(Tool.ERASER);
  };

  const undo = () => {
    canvasRef.current?.undo();
    triggerAction(Action.UNDO);
  };

  const clear = () => {
    canvasRef.current?.clear();
    triggerAction(Action.CANVAS_DELETED);
  };

  const save = () => {
    const data = canvasRef.current?.getSaveData();
    if (data) {
      saveDrawing(data);
      triggerAction(Action.SAVE_LOCAL_STORAGE);
    }
  };

  const load = () => {
    const saved = loadDrawing();
    if (saved) {
      canvasRef.current?.loadSaveData(saved, true);
      triggerAction(Action.LOAD_LOCAL_STORAGE);
    }
  };

  const download = () => {
    const canvasContainer = canvasRef.current?.canvasContainer;
    if (!canvasContainer) return;

    const drawingCanvas = canvasContainer.querySelectorAll("canvas")[1];
    if (!(drawingCanvas instanceof HTMLCanvasElement)) return;

    const dataUrl = drawingCanvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "MyDrawing.jpg";
    link.click();
  };

  return {
    actions: { erase, undo, clear, save, load, download },
  };
}
