import { TestBed } from '@angular/core/testing';

import { ApplicationsApiMappingService } from './applications-api-mapping.service';

describe('ApplicationsApiMappingService', () => {
  let service: ApplicationsApiMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsApiMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
