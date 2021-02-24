import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ApplicationStringFieldMetaData } from '@ric/applications/core';

@Component({
  selector: 'ric-application-form-string-field-errors',
  templateUrl: './application-form-string-field-errors.component.html',
  styleUrls: ['./application-form-string-field-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormStringFieldErrorsComponent {
  @Input()
  errors: ValidationErrors;

  @Input()
  fieldMetaData: ApplicationStringFieldMetaData;
}
