import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ApplicationFromComponent } from './application-from/application-from.component';
import { ApplicationFormFieldErrorsComponent } from './application-form-field-errors/application-form-field-errors.component';
// eslint-disable-next-line max-len
import { ApplicationFormStringFieldErrorsComponent } from './application-form-string-field-errors/application-form-string-field-errors.component';
// eslint-disable-next-line max-len
import { ApplicationFormNumberFieldErrorsComponent } from './application-form-number-field-errors/application-form-number-field-errors.component';
import { ApplicationFormFieldComponent } from './application-form-field/application-form-field.component';
import { ApplicationFormDialogComponent } from './application-form-dialog/application-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ApplicationFromComponent,
    ApplicationFormFieldErrorsComponent,
    ApplicationFormStringFieldErrorsComponent,
    ApplicationFormNumberFieldErrorsComponent,
    ApplicationFormFieldComponent,
    ApplicationFormDialogComponent,
  ],
  exports: [ApplicationFromComponent, ApplicationFormDialogComponent],
})
export class ApplicationFormModule {}
