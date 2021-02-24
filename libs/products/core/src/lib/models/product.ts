import { ProductDescription } from './product-description';

export class Product {
  readonly id: string;
  readonly name: string;
  readonly description: ProductDescription;

  constructor({ id, name, description }: Partial<Product> = {}) {
    this.id = id;
    this.name = name || '';
    this.description = description || new ProductDescription();
  }
}
