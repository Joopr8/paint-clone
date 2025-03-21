import {
  PaintContextType,
  Tool,
  Action,
  BrushSettings,
  PaintState,
} from "../types/PaintTypes";

export const DRAWING_KEY = "my-drawing";

export const saveDrawing = (data: string) => {
  localStorage.setItem(DRAWING_KEY, data);
};

export const loadDrawing = (): string | null => {
  return localStorage.getItem(DRAWING_KEY);
};

export function throwIfUsedOutsideProvider<T>(): React.Dispatch<
  React.SetStateAction<T>
> {
  return () => {
    throw new Error("Tried to use setter outside of PaintProvider.");
  };
}

export const defaultPaintContext: PaintContextType = {
  paintState: {
    tool: Tool.BRUSH,
    action: undefined,
    brushSettings: {
      brushSize: "10",
      brushColor: "#000",
    },
    backgroundColor: "rgb(255, 255, 255)",
  },
  canvasRef: { current: null },

  setTool: throwIfUsedOutsideProvider<Tool>(),
  setAction: throwIfUsedOutsideProvider<Action | undefined>(),
  setBrushSettings: throwIfUsedOutsideProvider<BrushSettings>(),
  setBackgroundColor: throwIfUsedOutsideProvider<string>(),
  setPaintState: throwIfUsedOutsideProvider<PaintState>(),
  triggerAction: () => {
    throw new Error("Tried to use triggerAction outside of PaintProvider.");
  },
};
