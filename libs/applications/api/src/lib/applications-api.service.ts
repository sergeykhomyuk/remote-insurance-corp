import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  validate,
  required,
  LoggerService,
  Assert,
  coreConfig,
} from '@ric/core';
import { ApplicationData, ApplicationMetaData } from '@ric/applications/core';
import { productsApiConfig } from '@ric/products/api';
import { ApplicationsApiMappingService } from './applications-api-mapping.service';
import { applicationsApiConfig } from './applications-api.config';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsApiService {
  private readonly http: HttpClient;
  private readonly applicationsApiMappingService: ApplicationsApiMappingService;
  private readonly loggerService: LoggerService;

  constructor(
    http: HttpClient,
    applicationsApiMappingService: ApplicationsApiMappingService,
    loggerService: LoggerService
  ) {
    this.http = http;
    this.applicationsApiMappingService = applicationsApiMappingService;
    this.loggerService = loggerService;
  }

  @validate
  async getApplicationMetaDataByProductId(
    @required productId: string
  ): Promise<ApplicationMetaData> {
    const url = `${coreConfig.api.baseUrl}/${productsApiConfig.products}/${productId}/${applicationsApiConfig.application}/get.json`;

    let response: { fields: unknown[] };

    try {
      response = await this.http.get<{ fields: unknown[] }>(url).toPromise();
    } catch (error) {
      this.loggerService.error('Failed to load application meta data', error);
      this.loggerService.captureException(error);

      const apiError = error; // Map/handle server-side error
      throw apiError;
    }

    const applicationMetaData = this.applicationsApiMappingService.mapApplicationMetaDataResponse(
      productId,
      response.fields
    );

    return applicationMetaData;
  }

  @validate
  async submitApplication(
    @required application: ApplicationData
  ): Promise<ApplicationData> {
    let response: { id: string };

    try {
      response = await new Promise(
        (resolve: (value: { id: string }) => void) => {
          setTimeout(
            () =>
              resolve({
                id: `${application.id}-${new Date().getTime()}}`,
              }),
            1500
          );
        }
      ); // Call REST API
    } catch (error) {
      this.loggerService.error('Failed to submit application data', error);
      this.loggerService.captureException(error);

      const apiError = error; // Map/handle server-side error
      throw apiError;
    }

    Assert.isNotNull(response.id, 'response.id');

    const submittedApplication = new ApplicationData({
      ...application,
      id: response.id,
    });

    return submittedApplication;
  }
}
