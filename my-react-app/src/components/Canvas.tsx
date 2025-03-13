import { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { usePaint } from "../hooks/usePaint";

export default function Canvas() {
  const { brushSettings, backgroundColor } = usePaint();
  const canvasRef = useRef<CanvasDraw | null>(null);

  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setCanvasSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="canvas-container">
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushSettings.brushColor}
        brushRadius={Number(brushSettings.brushSize)}
        lazyRadius={0}
        hideGrid={false}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        backgroundColor={backgroundColor}
      />
    </div>
  );
}
