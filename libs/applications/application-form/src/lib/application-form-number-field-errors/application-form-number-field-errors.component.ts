import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ApplicationNumberFieldMetaData } from '@ric/applications/core';

@Component({
  selector: 'ric-application-form-number-field-errors',
  templateUrl: './application-form-number-field-errors.component.html',
  styleUrls: ['./application-form-number-field-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormNumberFieldErrorsComponent {
  @Input()
  errors: ValidationErrors;

  @Input()
  fieldMetaData: ApplicationNumberFieldMetaData;
}
