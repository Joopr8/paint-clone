import { createContext, ReactNode, useRef, useState } from "react";
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

interface PaintContextType {
  tool: Tool;
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
  action: Action | undefined;
  setAction: React.Dispatch<React.SetStateAction<Action | undefined>>;
  brushSettings: BrushSettings;
  setBrushSettings: React.Dispatch<React.SetStateAction<BrushSettings>>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  canvasRef: React.RefObject<CanvasDraw | null>;
  onCanvasReady?: (canvas: CanvasDraw) => void;
  triggerAction: (action: Action, duration?: number) => void; // <-- NEW
}

interface PaintProviderProps {
  children: ReactNode;
}

const defaultPaintContext: PaintContextType = {
  tool: Tool.BRUSH,
  setTool: () => {},
  action: undefined,
  setAction: () => {},
  brushSettings: {
    brushSize: "10",
    brushColor: "#000",
  },
  setBrushSettings: () => {},
  backgroundColor: "rgb(255, 255, 255)",
  setBackgroundColor: () => {},
  canvasRef: { current: null },
  triggerAction: () => {}, // <-- NEW
};

export const PaintContext =
  createContext<PaintContextType>(defaultPaintContext);

export function PaintProvider({ children }: PaintProviderProps) {
  const actionTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const canvasRef = useRef<CanvasDraw | null>(null);

  const [tool, setTool] = useState<Tool>(Tool.BRUSH);

  const [action, setAction] = useState<Action | undefined>(undefined);

  const [brushSettings, setBrushSettings] = useState(
    defaultPaintContext.brushSettings
  );

  const [backgroundColor, setBackgroundColor] = useState(
    defaultPaintContext.backgroundColor
  );

  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const handleCanvasReady = (canvas: CanvasDraw) => {
    canvasRef.current = canvas;
    setIsCanvasReady(true);
  };

  const triggerAction = (newAction: Action, duration = 500) => {
    clearTimeout(actionTimeoutRef.current);
    setAction(newAction);
    actionTimeoutRef.current = setTimeout(() => {
      setAction(undefined);
    }, duration);
  };

  const value = {
    tool,
    setTool,
    action,
    setAction,
    brushSettings,
    setBrushSettings,
    backgroundColor,
    setBackgroundColor,
    canvasRef,
    onCanvasReady: handleCanvasReady,
    isCanvasReady,
    triggerAction,
  };

  return (
    <PaintContext.Provider value={value}>{children}</PaintContext.Provider>
  );
}
