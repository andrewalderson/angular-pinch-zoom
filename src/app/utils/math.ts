export interface Point {
  x: number;
  y: number;
}

export function getDistance(a?: Point, b?: Point): number {
  if (!(a && b)) {
    return 0;
  }
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}
