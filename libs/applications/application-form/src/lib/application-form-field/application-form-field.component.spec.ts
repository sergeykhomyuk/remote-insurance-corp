import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ApplicationFormFieldComponent } from './application-form-field.component';
import { ApplicationFieldMetaData } from '@ric/applications/core';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ric-application-form-field-errors',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockApplicationFormFieldErrorsComponent {
  @Input()
  errors: ValidationErrors;

  @Input()
  fieldMetaData: ApplicationFieldMetaData;
}

describe('ApplicationFormFieldComponent', () => {
  let component: ApplicationFormFieldComponent;
  let fixture: ComponentFixture<ApplicationFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ApplicationFormFieldComponent,
        MockApplicationFormFieldErrorsComponent,
      ],
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFormFieldComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
