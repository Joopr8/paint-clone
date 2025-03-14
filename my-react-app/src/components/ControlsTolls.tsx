import { usePaint } from "../hooks/usePaint";
import {
  saveDrawing,
  loadDrawing,
  clearDrawing,
} from "../utils/drawingStorage";

export default function ControlsTolls() {
  const { canvasRef, setBrushSettings, backgroundColor } = usePaint();

  function onEraseHandler() {
    setBrushSettings((prevState) => ({
      ...prevState,
      brushColor: backgroundColor,
    }));
  }

  const saveCanvas = () => {
    if (canvasRef.current) {
      const saveData = canvasRef.current.getSaveData();
      saveDrawing(saveData);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
    clearDrawing();
  };

  const loadCanvas = () => {
    const savedData = loadDrawing();
    if (canvasRef.current && savedData) {
      canvasRef.current.loadSaveData(savedData, true);
    }
  };

  // const downloadCanvas = () => {
  //   if (canvasRef.current) {
  //     const canvas = canvasRef.current.getSaveData(); // Access the canvas element
  //     const dataURL = canvas.toDataURL(); // Get the data URL of the canvas
  //     const link = document.createElement("a");
  //     link.href = dataURL;
  //     link.download = "drawing.png"; // Set the download attribute
  //     link.click(); // Trigger the download
  //   }
  // };

  return (
    <>
      <div className="tool" onClick={onEraseHandler}>
        <i className="fas fa-eraser" id="eraser" title="Eraser"></i>
      </div>
      <div className="tool" onClick={canvasRef.current?.undo}>
        <i className="fas fa-undo-alt" id="clear-canvas" title="Undo"></i>
      </div>
      <div className="tool" onClick={canvasRef.current?.clear}>
        <i className="fas fa-trash-alt" id="clear-storage" title="Delete"></i>
      </div>
      <div className="tool" onClick={saveCanvas}>
        <i
          className="fas fa-download"
          id="save-storage"
          title="Save Local Storage"
        ></i>
      </div>
      <div className="tool" onClick={loadCanvas}>
        <i
          className="fas fa-upload"
          id="load-storage"
          title="Load Local Storage"
        ></i>
      </div>
      <div className="tool" onClick={clearCanvas}>
        <i
          className="fas fa-trash-alt"
          id="clear-storage"
          title="Clear Local Storage"
        ></i>
      </div>
      <div className="tool">
        <i className="far fa-save" title="Save Image File"></i>
      </div>
    </>
  );
}
