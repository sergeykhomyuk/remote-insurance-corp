import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { coreConfig, LoggerService } from '@ric/core';
import { Product } from '@ric/products/core';
import { ProductsApiMappingService } from './products-api-mapping.service';
import { productsApiConfig } from './products-api.config';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly http: HttpClient;
  private readonly productsApiMappingService: ProductsApiMappingService;
  private readonly loggerService: LoggerService;

  constructor(
    http: HttpClient,
    productsApiMappingService: ProductsApiMappingService,
    loggerService: LoggerService
  ) {
    this.http = http;
    this.productsApiMappingService = productsApiMappingService;
    this.loggerService = loggerService;
  }

  async getProducts(): Promise<Product[]> {
    const url = `${coreConfig.api.baseUrl}/${productsApiConfig.products}/get.json`;

    let response: { products: unknown[] };

    try {
      response = await this.http.get<{ products: unknown[] }>(url).toPromise();
    } catch (error) {
      this.loggerService.error('Failed to load products', error);
      this.loggerService.captureException(error);

      const apiError = error; // Map/handle server-side error
      throw apiError;
    }

    const products =
      response.products?.map<Product>((productResponse: unknown) =>
        this.productsApiMappingService.mapProductResponse(productResponse)
      ) || [];

    return products;
  }
}
