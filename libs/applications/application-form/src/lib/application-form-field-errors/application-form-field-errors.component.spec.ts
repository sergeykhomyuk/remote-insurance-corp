import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormFieldErrorsComponent } from './application-form-field-errors.component';

describe('ApplicationFormFieldErrorsComponent', () => {
  let component: ApplicationFormFieldErrorsComponent;
  let fixture: ComponentFixture<ApplicationFormFieldErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationFormFieldErrorsComponent],
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
