import { useCanvasActions } from "../../hooks/useCanvasAction";
import styles from "./ControlsTool.module.css";

export default function ControlsTools() {
  const { actions } = useCanvasActions();

  return (
    <>
      <div className={styles.tool} onClick={actions.erase}>
        <i className="fas fa-eraser" title="Eraser"></i>
      </div>
      <div className={styles.tool} onClick={actions.undo}>
        <i className="fas fa-undo-alt" title="Undo"></i>
      </div>
      <div className={styles.tool} onClick={actions.clear}>
        <i className="fas fa-trash-alt" title="Delete"></i>
      </div>
      <div className={styles.tool} onClick={actions.save}>
        <i className="fas fa-save" title="Save Local Storage"></i>
      </div>
      <div className={styles.tool} onClick={actions.load}>
        <i className="fas fa-upload" title="Load Local Storage"></i>
      </div>
      <div className={styles.tool} onClick={actions.download}>
        <i className="fas fa-download" title="Save Image File"></i>
      </div>
    </>
  );
}
