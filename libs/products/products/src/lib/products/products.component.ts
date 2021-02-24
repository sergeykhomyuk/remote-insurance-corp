import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { required, validate } from '@ric/core';
import { ApplicationFormDialogComponent } from '@ric/applications/application-form';
import { ProductsApiService } from '@ric/products/api';
import { Product } from '@ric/products/core';

@Component({
  selector: 'ric-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  private readonly ref: ChangeDetectorRef;
  private readonly productsApiService: ProductsApiService;
  private readonly dialog: MatDialog;

  @Input()
  selectedProductId: string;

  @Output()
  readonly productSelected: EventEmitter<Product>;

  products: Product[];

  state: {
    isLoading: boolean;
    isFailed: boolean;
  };

  constructor(
    ref: ChangeDetectorRef,
    productsApiService: ProductsApiService,
    dialog: MatDialog
  ) {
    this.ref = ref;
    this.productsApiService = productsApiService;
    this.dialog = dialog;

    this.productSelected = new EventEmitter<Product>();

    this.products = [];

    this.state = {
      isLoading: false,
      isFailed: false,
    };
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onProductSelected(product: Product): void {
    this.productSelected.emit(product);
  }

  @validate
  onApplyForProduct(@required product: Product): void {
    this.dialog.open(ApplicationFormDialogComponent, {
      data: product,
      width: '500px',
    });
  }

  onTryLoadProducts(): void {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    this.state.isLoading = true;
    this.state.isFailed = false;

    try {
      const products = await this.productsApiService.getProducts();
      this.onProductsLoaded(products);
    } catch {
      this.state.isFailed = true;
    } finally {
      this.state.isLoading = false;
      this.ref.detectChanges();
    }
  }

  @validate
  private onProductsLoaded(@required products: Product[]): void {
    this.products = products;
  }
}
