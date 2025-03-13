import "@fortawesome/fontawesome-free/css/all.min.css";
import PaintTolls from "./PaintTolls";
import { usePaint } from "../hooks/usePaint";

export default function TopBarTolls() {
  const { tool } = usePaint();
  return (
    <>
      <div className="top-bar">
        <div className="active-tool">
          <span id="active-tool" title="Active Tool">
            {tool}
          </span>
        </div>
        <PaintTolls />
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
      </div>
      <div className="mobile-message">
        <h2>Please use a lager screen</h2>
      </div>
    </>
  );
}
