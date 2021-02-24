/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Assert, required, validate } from '@ric/core';
import {
  ApplicationFieldMetaData,
  ApplicationFieldType,
  ApplicationMetaData,
  ApplicationNumberFieldMetaData,
  ApplicationStringFieldMetaData,
} from '@ric/applications/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsApiMappingService {
  @validate
  mapApplicationMetaDataResponse(
    @required productId: string,
    @required response: any[]
  ): ApplicationMetaData {
    const fieldsMetaData = response.map<ApplicationFieldMetaData>(
      (fieldResponse: any) =>
        this.mapApplicationFieldMetaDataResponse(fieldResponse)
    );

    const applicationMetaData = new ApplicationMetaData({
      productId: productId,
      fields: fieldsMetaData,
    });

    return applicationMetaData;
  }

  @validate
  private mapApplicationFieldMetaDataResponse(
    @required response: any
  ): ApplicationFieldMetaData {
    Assert.isNotNull(response.id, 'response.id');

    const baseMetaData = new ApplicationFieldMetaData({
      id: response.id,
      title: response.title,
      isRequired: response.required,
    });

    switch (response.type) {
      case ApplicationFieldType.String:
        return this.mapApplicationStringFieldMetaDataResponse(
          response,
          baseMetaData
        );
      case ApplicationFieldType.Number:
        return this.mapApplicationNumberFieldMetaDataResponse(
          response,
          baseMetaData
        );
      default:
        throw new Error(`Unknown field type: "${response.type}".`);
    }
  }

  @validate
  private mapApplicationStringFieldMetaDataResponse(
    @required response: any,
    @required baseMetadata: ApplicationFieldMetaData
  ): ApplicationStringFieldMetaData {
    const metaData = new ApplicationStringFieldMetaData({
      ...baseMetadata,
      maxLength: response.maxLength,
    });

    return metaData;
  }

  @validate
  private mapApplicationNumberFieldMetaDataResponse(
    @required response: any,
    @required baseMetadata: ApplicationFieldMetaData
  ): ApplicationNumberFieldMetaData {
    const metaData = new ApplicationNumberFieldMetaData({
      ...baseMetadata,
      min: response.min,
      max: response.max,
    });

    return metaData;
  }
}
