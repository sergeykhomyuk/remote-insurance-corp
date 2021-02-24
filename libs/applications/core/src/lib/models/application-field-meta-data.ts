import { ApplicationFieldType } from './application-field-type';

export class ApplicationFieldMetaData {
  readonly id: string;
  readonly type: ApplicationFieldType;
  readonly title: string;
  readonly isRequired: boolean;

  constructor({
    id,
    type,
    title,
    isRequired,
  }: Partial<ApplicationFieldMetaData> = {}) {
    this.id = id;
    this.type = type;
    this.title = title || '';
    this.isRequired = isRequired || false;
  }
}
