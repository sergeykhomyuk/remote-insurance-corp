import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ApplicationFieldMetaData,
  ApplicationFieldType,
} from '@ric/applications/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ric-application-form-field',
  templateUrl: './application-form-field.component.html',
  styleUrls: ['./application-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormFieldComponent implements OnChanges, OnDestroy {
  private readonly ref: ChangeDetectorRef;

  controlChangesSubscription: Subscription;

  @Input()
  fieldMetaData: ApplicationFieldMetaData;

  @Input()
  control: FormControl;

  get controlType(): string {
    switch (this.fieldMetaData?.type) {
      case ApplicationFieldType.String:
        return 'text';
      case ApplicationFieldType.Number:
        return 'number';
      default:
        return 'text';
    }
  }

  constructor(ref: ChangeDetectorRef) {
    this.ref = ref;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const componentChanges = changes as {
      [TProperty in keyof ApplicationFormFieldComponent]: SimpleChange;
    };

    const controlChange = componentChanges.control;
    if (controlChange) {
      this.onControlChanged(controlChange.currentValue as FormControl);
    }
  }

  ngOnDestroy(): void {
    this.resetControlChangesSubscription();
  }

  private onControlChanged(control: FormControl): void {
    this.resetControlChangesSubscription();

    if (control) {
      this.controlChangesSubscription = control.statusChanges.subscribe(() => {
        this.ref.markForCheck();
      });
    }
  }

  private resetControlChangesSubscription(): void {
    if (!this.controlChangesSubscription) {
      return;
    }

    try {
      this.controlChangesSubscription.unsubscribe();
    } finally {
      this.controlChangesSubscription = null;
    }
  }
}
