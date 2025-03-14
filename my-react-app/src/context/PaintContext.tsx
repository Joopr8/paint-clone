import { createContext, ReactNode, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

export type Tool = "Brush" | "Eraser" | "Bucket"; // Add more tools as needed

export interface BrushSettings {
  brushSize: string;
  brushColor: string;
}

interface PaintContextType {
  tool: Tool;
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
  brushSettings: BrushSettings;
  setBrushSettings: React.Dispatch<React.SetStateAction<BrushSettings>>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  canvasRef: React.RefObject<CanvasDraw | null>;
  onCanvasReady?: (canvas: CanvasDraw) => void;
}

interface PaintProviderProps {
  children: ReactNode;
}

const defaultPaintContext: PaintContextType = {
  tool: "Brush",
  setTool: () => {},
  brushSettings: {
    brushSize: "10",
    brushColor: "#000",
  },
  setBrushSettings: () => {},
  backgroundColor: "rgb(255, 255, 255)",
  setBackgroundColor: () => {},
  canvasRef: { current: null },
};

export const PaintContext =
  createContext<PaintContextType>(defaultPaintContext);

export function PaintProvider({ children }: PaintProviderProps) {
  const canvasRef = useRef<CanvasDraw | null>(null);

  const [tool, setTool] = useState<Tool>("Brush");

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

  const value = {
    tool,
    setTool,
    brushSettings,
    setBrushSettings,
    backgroundColor,
    setBackgroundColor,
    canvasRef,
    onCanvasReady: handleCanvasReady,
    isCanvasReady,
  };

  return (
    <PaintContext.Provider value={value}>{children}</PaintContext.Provider>
  );
}
