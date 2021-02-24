/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Assert, required, validate } from '@ric/core';
import { Product, ProductDescription } from '@ric/products/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiMappingService {
  @validate
  mapProductResponse(@required response: any): Product {
    Assert.isNotNull(response.id, 'response.id');

    const description = this.mapProductDescriptionResponse(
      response.description
    );

    const product = new Product({
      id: response.id,
      name: response.name,
      description: description,
    });

    return product;
  }

  @validate
  private mapProductDescriptionResponse(
    @required response: any
  ): ProductDescription {
    const description = new ProductDescription({
      imageUrl: response.image,
      short: response.short,
      full: response.full,
    });

    return description;
  }
}
