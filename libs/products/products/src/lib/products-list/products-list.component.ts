import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { required, validate } from '@ric/core';
import { Product } from '@ric/products/core';

@Component({
  selector: 'ric-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  @Input()
  products: Product[];

  @Input()
  selectedProductId: string;

  @Output()
  readonly productSelected: EventEmitter<Product>;

  @Output()
  readonly applyForProduct: EventEmitter<Product>;

  constructor() {
    this.productSelected = new EventEmitter<Product>();
    this.applyForProduct = new EventEmitter<Product>();
  }

  @validate
  trackByProductId(index: number, @required product: Product): string {
    return product.id;
  }

  onProductOpened(product: Product): void {
    this.productSelected.emit(product);
  }

  onProductClosed(product: Product): void {
    if (product.id === this.selectedProductId) {
      this.productSelected.emit(null);
    }
  }

  @validate
  onApplyForProduct(@required product: Product) {
    this.applyForProduct.emit(product);
  }
}
