export type ObjectFit = 'none' | 'cover' | 'contain';

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0 && value < Infinity;
}
