import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Assert, coreConfig, required, validate } from '@ric/core';
import { Product } from '@ric/products/core';
import {
  ApplicationData,
  ApplicationFieldMetaData,
  ApplicationFormBuilderService,
  ApplicationMetaData,
} from '@ric/applications/core';
import { ApplicationsApiService } from '@ric/applications/api';

@Component({
  selector: 'ric-application-from',
  templateUrl: './application-from.component.html',
  styleUrls: ['./application-from.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFromComponent implements OnChanges {
  private readonly ref: ChangeDetectorRef;
  private readonly applicationsApiService: ApplicationsApiService;
  private readonly applicationFormBuilderService: ApplicationFormBuilderService;
  private readonly snackBar: MatSnackBar;

  @Input()
  product: Product;

  @Output()
  readonly applied: EventEmitter<ApplicationData>;

  @Output()
  readonly canceled: EventEmitter<void>;

  applicationForm: FormGroup;
  applicationMetaData: ApplicationMetaData;

  state: {
    isLoading: boolean;
    isLoadingFailed: boolean;
    isSubmitting: boolean;
  };

  constructor(
    ref: ChangeDetectorRef,
    applicationFormBuilderService: ApplicationFormBuilderService,
    applicationsApiService: ApplicationsApiService,
    snackBar: MatSnackBar
  ) {
    this.ref = ref;
    this.applicationFormBuilderService = applicationFormBuilderService;
    this.applicationsApiService = applicationsApiService;
    this.snackBar = snackBar;

    this.applied = new EventEmitter<ApplicationData>();
    this.canceled = new EventEmitter<void>();

    this.state = {
      isLoading: false,
      isLoadingFailed: false,
      isSubmitting: false,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    const componentChanges = changes as {
      [TProperty in keyof ApplicationFromComponent]: SimpleChange;
    };

    const productChange = componentChanges.product;
    if (!productChange) {
      return;
    }

    const product = productChange.currentValue as Product;
    if (!product) {
      this.onProductIdChanged(null);
      return;
    }

    const previousProduct = productChange.previousValue as Product;

    const isProductIdChanged =
      !previousProduct || previousProduct.id !== product.id;

    if (isProductIdChanged) {
      this.onProductIdChanged(product.id);
    }
  }

  async onSubmit(): Promise<void> {
    Assert.isNotNull(this.product, 'product');
    Assert.isNotNull(this.applicationForm, 'applicationForm');

    const applicationData = new ApplicationData({
      productId: this.product.id,
      data: this.applicationForm.value,
    });

    this.state.isSubmitting = true;
    this.applicationForm.disable();

    try {
      const result = await this.applicationsApiService.submitApplication(
        applicationData
      );
      this.onApplicationSubmitted(result);
    } catch {
      this.snackBar.open(
        'Failed to submit application. We are working on getting this fixed this as soon as possible. Try again later.',
        'Close',
        {
          duration: coreConfig.snackBar.duration,
        }
      );
      this.applicationForm.enable();
    } finally {
      this.state.isSubmitting = false;
      this.ref.detectChanges();
    }
  }

  onCancel(): void {
    this.canceled.emit();
  }

  onTryLoadApplicationMetaData(): void {
    if (this.product) {
      this.loadApplicationMetaData(this.product.id);
    }
  }

  @validate
  trackByFieldId(
    index: number,
    @required field: ApplicationFieldMetaData
  ): string {
    return field.id;
  }

  @validate
  private onApplicationSubmitted(
    @required applicationData: ApplicationData
  ): void {
    this.snackBar.open('Application has been submitted', 'Close', {
      duration: coreConfig.snackBar.duration,
    });
    this.applied.emit(applicationData);
  }

  private onProductIdChanged(productId: string): void {
    this.applicationForm = null;
    this.applicationMetaData = null;

    if (productId) {
      this.loadApplicationMetaData(productId);
    }
  }

  @validate
  private async loadApplicationMetaData(
    @required productId: string
  ): Promise<void> {
    this.state.isLoadingFailed = false;
    this.state.isLoading = true;

    try {
      const applicationMetaData = await this.applicationsApiService.getApplicationMetaDataByProductId(
        productId
      );

      this.onApplicationMetaDataLoaded(applicationMetaData);
    } catch {
      this.state.isLoadingFailed = true;
    } finally {
      this.state.isLoading = false;
      this.ref.detectChanges();
    }
  }

  @validate
  private onApplicationMetaDataLoaded(
    @required applicationMetaData: ApplicationMetaData
  ): void {
    this.applicationMetaData = applicationMetaData;
    this.applicationForm = this.applicationFormBuilderService.buildApplicationForm(
      applicationMetaData
    );
  }
}
