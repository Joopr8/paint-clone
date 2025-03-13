import { createContext, ReactNode, useState } from "react";

// Types
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
};

export const PaintContext =
  createContext<PaintContextType>(defaultPaintContext);

export function PaintProvider({ children }: PaintProviderProps) {
  const [tool, setTool] = useState<Tool>("Brush");
  const [brushSettings, setBrushSettings] = useState(
    defaultPaintContext.brushSettings
  );

  const value = {
    tool,
    setTool,
    brushSettings,
    setBrushSettings,
  };

  return (
    <PaintContext.Provider value={value}>{children}</PaintContext.Provider>
  );
}
