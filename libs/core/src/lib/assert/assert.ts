export class Assert {
  static isNotNull(value: unknown, name: string): void {
    if (value === null || value === void 0) {
      throw new Error(`"${name}" cannot be null.`);
    }
  }

  static isTrue(value: boolean, name: string): void {
    if (!value) {
      throw new Error(`"${name}" should be true.`);
    }
  }

  static isFalse(value: boolean, name: string): void {
    if (value) {
      throw new Error(`"${name}" should be false.`);
    }
  }
}
