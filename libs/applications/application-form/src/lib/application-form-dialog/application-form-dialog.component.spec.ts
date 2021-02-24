import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationData } from '@ric/applications/core';
import { Product } from '@ric/products/core';

import { ApplicationFormDialogComponent } from './application-form-dialog.component';

@Component({
  selector: 'ric-application-from',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ApplicationFromComponent {
  @Input()
  product: Product;

  @Output()
  readonly applied: EventEmitter<ApplicationData>;

  constructor() {
    this.applied = new EventEmitter<ApplicationData>();
  }
}

describe('ApplicationFormDialogComponent', () => {
  let component: ApplicationFormDialogComponent;
  let fixture: ComponentFixture<ApplicationFormDialogComponent>;
  let dialogRefMock: MatDialogRef<ApplicationFormDialogComponent>;

  beforeEach(async () => {
    dialogRefMock = {
      close: () => null,
    } as MatDialogRef<ApplicationFormDialogComponent>;

    await TestBed.configureTestingModule({
      declarations: [ApplicationFormDialogComponent, ApplicationFromComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
