import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product, productsConfig } from '@ric/products/core';

@Component({
  selector: 'ric-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnInit {
  private readonly route: ActivatedRoute;
  private readonly router: Router;

  selectedProductId: string;

  constructor(route: ActivatedRoute, router: Router) {
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedProductId = params.get(
        productsConfig.routes.params.productId
      );
    });
  }

  onProductSelected(product: Product): void {
    const optionalPrams = product
      ? {
          [productsConfig.routes.params.productId]: product.id,
        }
      : {};

    this.router.navigate(['/', productsConfig.routes.products, optionalPrams]);
  }
}
