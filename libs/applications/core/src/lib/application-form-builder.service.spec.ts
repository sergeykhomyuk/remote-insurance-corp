import { TestBed } from '@angular/core/testing';

import { ApplicationFormBuilderService } from './application-form-builder.service';

describe('ApplicationFormBuilderService', () => {
  let service: ApplicationFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
