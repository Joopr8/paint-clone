import { useCanvasActions } from "../hooks/useCanvasAction";

export default function ControlsTools() {
  const { actions } = useCanvasActions();

  return (
    <>
      <div className="tool" onClick={actions.erase}>
        <i className="fas fa-eraser" id="eraser" title="Eraser"></i>
      </div>
      <div className="tool" onClick={actions.undo}>
        <i className="fas fa-undo-alt" id="clear-canvas" title="Undo"></i>
      </div>
      <div className="tool" onClick={actions.clear}>
        <i className="fas fa-trash-alt" id="clear-storage" title="Delete"></i>
      </div>
      <div className="tool" onClick={actions.save}>
        <i
          className="fas fa-save"
          id="save-storage"
          title="Save Local Storage"
        ></i>
      </div>
      <div className="tool" onClick={actions.load}>
        <i
          className="fas fa-upload"
          id="load-storage"
          title="Load Local Storage"
        ></i>
      </div>
      <div className="tool" onClick={actions.download}>
        <i className="fas fa-download" title="Save Image File"></i>
      </div>
    </>
  );
}
