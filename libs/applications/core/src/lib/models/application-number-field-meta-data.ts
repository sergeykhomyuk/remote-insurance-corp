import { ApplicationFieldMetaData } from './application-field-meta-data';
import { ApplicationFieldType } from './application-field-type';

export class ApplicationNumberFieldMetaData extends ApplicationFieldMetaData {
  readonly min: number;
  readonly max: number;

  constructor({
    id,
    title,
    isRequired,
    min,
    max,
  }: Partial<ApplicationNumberFieldMetaData> = {}) {
    super({ id, type: ApplicationFieldType.Number, title, isRequired });

    this.min = min;
    this.max = max;
  }
}
