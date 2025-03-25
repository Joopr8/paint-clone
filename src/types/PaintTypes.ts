import { ReactNode } from "react";
import CanvasDraw from "react-canvas-draw";

type Point = { x: number; y: number };

export interface Line {
  brushColor: string;
  brushRadius: number;
  points: Point[];
}

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
  action?: Action;
  brushSettings: BrushSettings;
  backgroundColor: string;
}

export interface CustomCanvasDraw extends CanvasDraw {
  canvasContainer: HTMLDivElement;
}

export interface PaintContextType {
  paintState: PaintState;
  setPaintState: React.Dispatch<React.SetStateAction<PaintState>>;

  setTool: (tool: Tool) => void;
  setAction: (action: Action) => void;
  setBrushSettings: (brush: BrushSettings) => void;
  setBackgroundColor: (color: string) => void;
  triggerAction: (action: Action, duration?: number) => void;

  canvasRef: React.RefObject<CustomCanvasDraw | null>;
}

export interface PaintProviderProps {
  children: ReactNode;
}
