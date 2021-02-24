import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductsComponent } from './products.component';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '@ric/products/core';

@Component({
  selector: 'ric-products-list',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockProductsListComponent {
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
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, MockProductsListComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
