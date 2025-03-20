import { usePaint } from "../hooks/usePaint";
import { saveDrawing, loadDrawing } from "../utils/drawingStorage";
import { Action, Tool } from "../context/PaintContext";

export default function ControlsTolls() {
  const {
    canvasRef,
    setBrushSettings,
    backgroundColor,
    setTool,
    triggerAction,
  } = usePaint();

  function onEraseHandler() {
    setBrushSettings((prevState) => ({
      ...prevState,
      brushColor: backgroundColor,
    }));
    setTool(Tool.ERASER);
  }

  const saveCanvas = () => {
    if (canvasRef.current) {
      const saveData = canvasRef.current.getSaveData();
      saveDrawing(saveData);
      triggerAction(Action.SAVE_LOCAL_STORAGE);
    }
  };

  const loadStorageCanvas = () => {
    const savedData = loadDrawing();
    if (canvasRef.current && savedData) {
      canvasRef.current.loadSaveData(savedData, true);
      triggerAction(Action.LOAD_LOCAL_STORAGE);
    }
  };

  const undoDrawing = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
      triggerAction(Action.UNDO);
    }
  };

  const clearCurrentDrawing = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      triggerAction(Action.CANVAS_DELETED);
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
      <div className="tool" onClick={undoDrawing}>
        <i className="fas fa-undo-alt" id="clear-canvas" title="Undo"></i>
      </div>
      <div className="tool" onClick={clearCurrentDrawing}>
        <i className="fas fa-trash-alt" id="clear-storage" title="Delete"></i>
      </div>
      <div className="tool" onClick={saveCanvas}>
        <i
          className="fas fa-download"
          id="save-storage"
          title="Save Local Storage"
        ></i>
      </div>
      <div className="tool" onClick={loadStorageCanvas}>
        <i
          className="fas fa-upload"
          id="load-storage"
          title="Load Local Storage"
        ></i>
      </div>
      <div className="tool">
        <i className="far fa-save" title="Save Image File"></i>
      </div>
    </>
  );
}
