import 'reflect-metadata';
import { Assert } from './assert';

const requiredMetadataKey = Symbol('required');

export function required(
  target: unknown,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];

  existingRequiredParameters.push(parameterIndex);

  Reflect.defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  );
}

export function validate(
  target: unknown,
  propertyName: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  descriptor: TypedPropertyDescriptor<Function>
) {
  const method = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const requiredParameters: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyName
    );

    if (requiredParameters) {
      for (const parameterIndex of requiredParameters) {
        Assert.isTrue(parameterIndex < arguments.length, propertyName);
        Assert.isNotNull(args[parameterIndex], propertyName);
      }
    }

    return method.apply(this, args);
  };
}
