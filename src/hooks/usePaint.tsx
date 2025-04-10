import { useContext } from "react";
import { PaintContext } from "../context/PaintContext";

export const usePaint = () => {
  const context = useContext(PaintContext);
  if (!context) {
    throw new Error("usePaint must be used within a PaintProvider");
  }
  return context;
};
