import { useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { usePaint } from "../hooks/usePaint";

export default function Canvas() {
  const { brushSettings } = usePaint();
  const canvasRef = useRef<CanvasDraw | null>(null);

  return (
    <div className="canvas-container">
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushSettings.brushColor}
        brushRadius={Number(brushSettings.brushSize)}
        lazyRadius={0} // Makes drawing smoother
        hideGrid={false} // Hide the grid
        canvasWidth={window.innerWidth}
        canvasHeight={window.innerHeight}
      />
    </div>
  );
}
