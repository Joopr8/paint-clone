import { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { usePaint } from "../../hooks/usePaint";
import styles from "./Canvas.module.css";

export default function Canvas() {
  const { paintState, canvasRef } = usePaint();

  const { brushSettings, backgroundColor } = paintState;

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
    <div className={styles.canvasContainer}>
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushSettings.brushColor}
        brushRadius={Number(brushSettings.brushSize)}
        lazyRadius={0}
        hideGrid={true}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        backgroundColor={backgroundColor}
      />
    </div>
  );
}
