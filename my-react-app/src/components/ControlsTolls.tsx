export default function ControlsTolls() {
  return (
    <>
      <div className="tool">
        <i className="fas fa-eraser" id="eraser" title="Eraser"></i>
      </div>
      <div className="tool">
        <i className="fas fa-undo-alt" id="clear-canvas" title="Clear"></i>
      </div>
      <div className="tool">
        <i
          className="fas fa-download"
          id="save-storage"
          title="Save Local Storage"
        ></i>
      </div>
      <div className="tool">
        <i
          className="fas fa-upload"
          id="load-storage"
          title="Load Local Storage"
        ></i>
      </div>
      <div className="tool">
        <i
          className="fas fa-trash-alt"
          id="clear-storage"
          title="Clear Local Storage"
        ></i>
      </div>
      <div className="tool">
        <a id="download">
          <i className="far fa-save" title="Save Image File"></i>
        </a>
      </div>
    </>
  );
}
