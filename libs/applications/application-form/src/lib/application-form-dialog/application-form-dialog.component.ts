import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationData } from '@ric/applications/core';
import { required, validate } from '@ric/core';
import { Product } from '@ric/products/core';

@Component({
  selector: 'ric-application-form-dialog',
  templateUrl: './application-form-dialog.component.html',
  styleUrls: ['./application-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormDialogComponent {
  private readonly dialogRef: MatDialogRef<ApplicationFormDialogComponent>;

  readonly product: Product;

  constructor(
    dialogRef: MatDialogRef<ApplicationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) product: Product
  ) {
    this.dialogRef = dialogRef;
    this.product = product;
  }

  @validate
  onApplied(@required application: ApplicationData): void {
    this.dialogRef.close(application);
  }

  onCanceled(): void {
    this.dialogRef.close();
  }
}
