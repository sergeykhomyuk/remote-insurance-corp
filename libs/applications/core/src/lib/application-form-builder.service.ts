import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberUtils, required, validate } from '@ric/core';
import {
  ApplicationFieldMetaData,
  ApplicationFieldType,
  ApplicationMetaData,
  ApplicationNumberFieldMetaData,
  ApplicationStringFieldMetaData,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class ApplicationFormBuilderService {
  @validate
  buildApplicationForm(
    @required applicationMetaData: ApplicationMetaData
  ): FormGroup {
    const controlsConfig = applicationMetaData.fields.reduce(
      (
        result: { [key: string]: FormControl },
        fieldMetaData: ApplicationFieldMetaData
      ) => {
        result[fieldMetaData.id] = this.buildApplicationFieldControl(
          fieldMetaData
        );
        return result;
      },
      {}
    );

    const applicationForm = new FormGroup(controlsConfig);

    return applicationForm;
  }

  @validate
  private buildApplicationFieldControl(
    @required fieldMetaData: ApplicationFieldMetaData
  ): FormControl {
    switch (fieldMetaData.type) {
      case ApplicationFieldType.String:
        return this.buildApplicationStringFieldControl(
          fieldMetaData as ApplicationStringFieldMetaData
        );
      case ApplicationFieldType.Number:
        return this.buildApplicationNumberFieldControl(
          fieldMetaData as ApplicationNumberFieldMetaData
        );
      default:
        throw new Error(`Unknown field type: "${fieldMetaData.type}".`);
    }
  }

  @validate
  private buildApplicationStringFieldControl(
    @required fieldMetaData: ApplicationStringFieldMetaData
  ): FormControl {
    const validators = [];
    if (fieldMetaData.isRequired) {
      validators.push(Validators.required);
    }
    if (NumberUtils.isFiniteNumber(fieldMetaData.maxLength)) {
      validators.push(Validators.maxLength(fieldMetaData.maxLength));
    }

    const control = new FormControl('', validators);

    return control;
  }

  @validate
  private buildApplicationNumberFieldControl(
    @required fieldMetaData: ApplicationNumberFieldMetaData
  ): FormControl {
    const validators = [];

    if (fieldMetaData.isRequired) {
      validators.push(Validators.required);
    }

    if (NumberUtils.isFiniteNumber(fieldMetaData.min)) {
      validators.push(Validators.min(fieldMetaData.min));
    }

    if (NumberUtils.isFiniteNumber(fieldMetaData.max)) {
      validators.push(Validators.max(fieldMetaData.max));
    }

    const control = new FormControl('', validators);

    return control;
  }
}
