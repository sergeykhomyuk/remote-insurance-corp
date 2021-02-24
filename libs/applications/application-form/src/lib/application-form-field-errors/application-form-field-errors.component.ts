import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import {
  ApplicationFieldMetaData,
  ApplicationFieldType,
} from '@ric/applications/core';

@Component({
  selector: 'ric-application-form-field-errors',
  templateUrl: './application-form-field-errors.component.html',
  styleUrls: ['./application-form-field-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormFieldErrorsComponent {
  @Input()
  errors: ValidationErrors;

  @Input()
  fieldMetaData: ApplicationFieldMetaData;

  get ApplicationFieldType(): typeof ApplicationFieldType {
    return ApplicationFieldType;
  }
}
