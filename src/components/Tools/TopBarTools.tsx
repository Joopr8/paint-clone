import "@fortawesome/fontawesome-free/css/all.min.css";
import PaintTools from "./PaintTools";
import { usePaint } from "../../hooks/usePaint";
import ControlsTools from "./ControlsTools";
import styles from "./TopBarTools.module.css";

export default function TopBarTools() {
  const { paintState } = usePaint();
  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.activeTool}>
          <span>{paintState.action || paintState.tool}</span>
        </div>
        <PaintTools />
        <ControlsTools />
      </div>
    </>
  );
}
