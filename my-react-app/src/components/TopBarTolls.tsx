import "@fortawesome/fontawesome-free/css/all.min.css";
import PaintTolls from "./PaintTolls";
import { usePaint } from "../hooks/usePaint";
import ControlsTolls from "./ControlsTolls";

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
        <ControlsTolls />
      </div>
      <div className="mobile-message">
        <h2>Please use a lager screen</h2>
      </div>
    </>
  );
}
