export const DRAWING_KEY = "my-drawing";

export const saveDrawing = (data: string) => {
  localStorage.setItem(DRAWING_KEY, data);
};

export const loadDrawing = (): string | null => {
  return localStorage.getItem(DRAWING_KEY);
};

export const clearDrawing = () => {
  localStorage.removeItem(DRAWING_KEY);
};
