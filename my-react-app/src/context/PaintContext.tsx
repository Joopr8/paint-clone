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
  canvasRef: { current: null }, // ✅ Dummy ref object for initial value
};

export const PaintContext =
  createContext<PaintContextType>(defaultPaintContext);

export function PaintProvider({ children }: PaintProviderProps) {
  const [tool, setTool] = useState<Tool>("Brush");
  const [brushSettings, setBrushSettings] = useState(
    defaultPaintContext.brushSettings
  );
  const [backgroundColor, setBackgroundColor] = useState(
    defaultPaintContext.backgroundColor
  );
  const canvasRef = useRef<CanvasDraw | null>(null); // ✅ Actual ref used in the app

  const value = {
    tool,
    setTool,
    brushSettings,
    setBrushSettings,
    backgroundColor,
    setBackgroundColor,
    canvasRef,
  };

  return (
    <PaintContext.Provider value={value}>{children}</PaintContext.Provider>
  );
}
