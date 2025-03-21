import { createContext } from "react";

import { defaultPaintContext } from "../utils/PaintUtils";
import { PaintContextType } from "../types/PaintTypes";

export const PaintContext =
  createContext<PaintContextType>(defaultPaintContext);
