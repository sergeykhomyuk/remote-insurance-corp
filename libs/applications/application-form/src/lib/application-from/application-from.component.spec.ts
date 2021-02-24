import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ApplicationFromComponent } from './application-from.component';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApplicationFieldMetaData } from '@ric/applications/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ric-application-form-field',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockApplicationFormFieldComponent {
  @Input()
  fieldMetaData: ApplicationFieldMetaData;

  @Input()
  control: FormControl;
}

describe('ApplicationFromComponent', () => {
  let component: ApplicationFromComponent;
  let fixture: ComponentFixture<ApplicationFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ApplicationFromComponent,
        MockApplicationFormFieldComponent,
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
