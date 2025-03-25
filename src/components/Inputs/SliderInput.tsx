import { usePaint } from "../../hooks/usePaint";
import styles from "./Input.module.css";

interface SliderInputProps {
  value: string;
  onSelectRange: (value: string) => void;
}

export default function SliderInput({
  value,
  onSelectRange,
}: SliderInputProps) {
  const { paintState } = usePaint();

  const { brushSettings } = paintState;
  return (
    <>
      <span className={styles.size}>
        <span> {brushSettings.brushSize} </span>
      </span>
      <input
        type="range"
        min="1"
        max="50"
        value={value}
        onChange={(e) => onSelectRange(e.target.value)}
        className={styles.slider}
      />
    </>
  );
}
