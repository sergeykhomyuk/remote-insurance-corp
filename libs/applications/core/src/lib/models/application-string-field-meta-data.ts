import { ApplicationFieldMetaData } from './application-field-meta-data';
import { ApplicationFieldType } from './application-field-type';

export class ApplicationStringFieldMetaData extends ApplicationFieldMetaData {
  readonly maxLength: number;

  constructor({
    id,
    title,
    isRequired,
    maxLength,
  }: Partial<ApplicationStringFieldMetaData> = {}) {
    super({ id, type: ApplicationFieldType.String, title, isRequired });

    this.maxLength = maxLength;
  }
}
