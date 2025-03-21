import { useCallback, useMemo, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { PaintContext } from "./PaintContext";
import {
  Action,
  BrushSettings,
  PaintProviderProps,
  Tool,
} from "../types/PaintTypes";
import { defaultPaintContext } from "../utils/PaintUtils";

export function PaintProvider({ children }: PaintProviderProps) {
  const actionTimeoutRef = useRef<number | undefined>(undefined);

  const canvasRef = useRef<CanvasDraw | null>(null);

  const [paintState, setPaintState] = useState(defaultPaintContext.paintState);

  const setTool = (tool: Tool) => {
    setPaintState((prev) => ({ ...prev, tool }));
  };

  const setBrushSettings = (brushSettings: BrushSettings) => {
    setPaintState((prev) => ({ ...prev, brushSettings }));
  };

  const setBackgroundColor = (backgroundColor: string) => {
    setPaintState((prev) => ({ ...prev, backgroundColor }));
  };

  const setAction = useCallback((action: Action | undefined) => {
    setPaintState((prev) => ({ ...prev, action }));
  }, []);

  const triggerAction = useCallback(
    (newAction: Action, duration = 500) => {
      clearTimeout(actionTimeoutRef.current);
      setAction(newAction);
      actionTimeoutRef.current = setTimeout(() => {
        setPaintState((prev) => ({ ...prev, action: undefined }));
      }, duration);
    },
    [setAction]
  );

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
    [setAction, paintState, triggerAction]
  );

  return (
    <PaintContext.Provider value={value}>{children}</PaintContext.Provider>
  );
}
