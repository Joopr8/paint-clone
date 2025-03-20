import "@fortawesome/fontawesome-free/css/all.min.css";
import PaintTools from "./PaintTools";
import { usePaint } from "../hooks/usePaint";
import ControlsTools from "./ControlsTools";

export default function TopBarTools() {
  const { tool, action } = usePaint();
  return (
    <>
      <div className="top-bar">
        <div className="active-tool">
          <span id="active-tool" title="Active Tool">
            {action || tool}
          </span>
        </div>
        <PaintTools />
        <ControlsTools />
      </div>
      <div className="mobile-message">
        <h2>Please use a lager screen</h2>
      </div>
    </>
  );
}
