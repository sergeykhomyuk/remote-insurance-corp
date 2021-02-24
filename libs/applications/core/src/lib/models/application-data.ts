export class ApplicationData {
  readonly id: string;
  readonly productId: string;
  readonly date: Date;
  readonly data: { [key: string]: unknown };

  constructor({ id, productId, date, data }: Partial<ApplicationData> = {}) {
    this.id = id;
    this.productId = productId;
    this.date = date;
    this.data = data || {};
  }
}
