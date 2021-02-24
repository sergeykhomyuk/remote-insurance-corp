import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormNumberFieldErrorsComponent } from './application-form-number-field-errors.component';

describe('ApplicationFormNumberFieldErrorsComponent', () => {
  let component: ApplicationFormNumberFieldErrorsComponent;
  let fixture: ComponentFixture<ApplicationFormNumberFieldErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationFormNumberFieldErrorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ApplicationFormNumberFieldErrorsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
