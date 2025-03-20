type Point = { x: number; y: number };

export interface Line {
  brushColor: string;
  brushRadius: number;
  points: Point[];
}
