export class NumberUtils {
  static isFiniteNumber(value: number): boolean {
    const isFiniteNumber = typeof value === 'number' && !Number.isNaN(value);

    return isFiniteNumber;
  }
}
