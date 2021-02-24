import { ApplicationFieldMetaData } from './application-field-meta-data';

export class ApplicationMetaData {
  readonly productId: string;
  readonly fields: ApplicationFieldMetaData[];

  constructor({ productId, fields }: Partial<ApplicationMetaData> = {}) {
    this.productId = productId;
    this.fields = fields || [];
  }
}
