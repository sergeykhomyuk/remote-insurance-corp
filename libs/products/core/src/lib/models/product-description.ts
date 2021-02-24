export class ProductDescription {
  readonly imageUrl: string;
  readonly short: string;
  readonly full: string;

  constructor({ imageUrl, short, full }: Partial<ProductDescription> = {}) {
    this.imageUrl = imageUrl || '';
    this.short = short || '';
    this.full = full || '';
  }
}
