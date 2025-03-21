import { createContext, ReactNode, useMemo, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

export enum Tool {
  BRUSH = "Brush",
  ERASER = "Eraser",
}

export enum Action {
  BACKGROUND_CHANGED = "Background Changed",
  UNDO = "Undo",
  CANVAS_DELETED = "Board Cleaned",
  SAVE_LOCAL_STORAGE = "Save on Local Storage",
  LOAD_LOCAL_STORAGE = "Loaded from Local Storage",
}

export interface BrushSettings {
  brushSize: string;
  brushColor: string;
}

export interface PaintState {
  tool: Tool;
  action?: Action | undefined;
  brushSettings: BrushSettings;
  backgroundColor: string;
}

interface PaintContextType {
  paintState: PaintState;
  setPaintState: React.Dispatch<React.SetStateAction<PaintState>>;

  setTool: (tool: Tool) => void;
  setAction: (action: Action | undefined) => void;
  setBrushSettings: (brush: BrushSettings) => void;
  setBackgroundColor: (color: string) => void;
  triggerAction: (action: Action, duration?: number) => void;

  canvasRef: React.RefObject<CanvasDraw | null>;
}

interface PaintProviderProps {
  children: ReactNode;
}

function throwIfUsedOutsideProvider<T>(): React.Dispatch<
  React.SetStateAction<T>
> {
  return () => {
    throw new Error("Tried to use setter outside of PaintProvider.");
  };
}

const defaultPaintContext: PaintContextType = {
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

export const PaintContext =
  createContext<PaintContextType>(defaultPaintContext);

export function PaintProvider({ children }: PaintProviderProps) {
  const actionTimeoutRef = useRef<number | undefined>(undefined);

  const canvasRef = useRef<CanvasDraw | null>(null);

  const [paintState, setPaintState] = useState(defaultPaintContext.paintState);

  const setTool = (tool: Tool) => setPaintState((prev) => ({ ...prev, tool }));

  const setAction = (action: Action | undefined) =>
    setPaintState((prev) => ({ ...prev, action }));

  const setBrushSettings = (brushSettings: BrushSettings) =>
    setPaintState((prev) => ({ ...prev, brushSettings }));

  const setBackgroundColor = (backgroundColor: string) =>
    setPaintState((prev) => ({ ...prev, backgroundColor }));

  const triggerAction = (newAction: Action, duration = 500) => {
    clearTimeout(actionTimeoutRef.current);
    setAction(newAction);
    actionTimeoutRef.current = setTimeout(() => {
      setPaintState((prev) => ({ ...prev, action: undefined }));
    }, duration);
  };

  const value = useMemo(
    () => ({
      setTool,
      setAction,
      setBrushSettings,
      setBackgroundColor,
      paintState,
      setPaintState,
      canvasRef,
      triggerAction,
    }),
    [paintState]
  );

  return (
    <PaintContext.Provider value={value}>{children}</PaintContext.Provider>
  );
}
