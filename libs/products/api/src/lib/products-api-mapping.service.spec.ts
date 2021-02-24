import { TestBed } from '@angular/core/testing';

import { ProductsApiMappingService } from './products-api-mapping.service';

describe('ProductsApiMappingService', () => {
  let service: ProductsApiMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsApiMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
