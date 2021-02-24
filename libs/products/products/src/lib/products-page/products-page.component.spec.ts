import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '@ric/products/core';
import { ProductsPageComponent } from './products-page.component';

@Component({
  selector: 'ric-products',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockProductsComponent {
  @Input()
  selectedProductId: string;

  @Output()
  readonly productSelected: EventEmitter<Product>;

  constructor() {
    this.productSelected = new EventEmitter<Product>();
  }
}

describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPageComponent, MockProductsComponent],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
