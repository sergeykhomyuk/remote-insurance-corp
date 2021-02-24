import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationErrors } from '@angular/forms';
import {
  ApplicationNumberFieldMetaData,
  ApplicationStringFieldMetaData,
} from '@ric/applications/core';

import { ApplicationFormFieldErrorsComponent } from './application-form-field-errors.component';

@Component({
  selector: 'ric-application-form-number-field-errors',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockApplicationFormNumberFieldErrorsComponent {
  @Input()
  errors: ValidationErrors;

  @Input()
  fieldMetaData: ApplicationNumberFieldMetaData;
}

@Component({
  selector: 'ric-application-form-string-field-errors',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockApplicationFormStringFieldErrorsComponent {
  @Input()
  errors: ValidationErrors;

  @Input()
  fieldMetaData: ApplicationStringFieldMetaData;
}

describe('ApplicationFormFieldErrorsComponent', () => {
  let component: ApplicationFormFieldErrorsComponent;
  let fixture: ComponentFixture<ApplicationFormFieldErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ApplicationFormFieldErrorsComponent,
        MockApplicationFormNumberFieldErrorsComponent,
        MockApplicationFormStringFieldErrorsComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFormFieldErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
