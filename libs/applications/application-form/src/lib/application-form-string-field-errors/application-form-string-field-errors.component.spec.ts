import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormStringFieldErrorsComponent } from './application-form-string-field-errors.component';

describe('ApplicationFormStringFieldErrorsComponent', () => {
  let component: ApplicationFormStringFieldErrorsComponent;
  let fixture: ComponentFixture<ApplicationFormStringFieldErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationFormStringFieldErrorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ApplicationFormStringFieldErrorsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
