import { Injectable } from '@angular/core';
import { required, validate } from '../assert';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  @validate
  error(@required message: string, ...details: unknown[]): void {
    console.error(message, ...details);
  }

  @validate
  warning(@required message: string, ...details: unknown[]): void {
    console.warn(message, ...details);
  }

  @validate
  info(@required message: string, ...details: unknown[]): void {
    // eslint-disable-next-line no-restricted-syntax
    console.info(message, ...details);
  }

  captureException(exception: unknown) {
    if (!exception) {
      this.warning('Cannot capture emtpy exception.');
      return;
    }

    try {
      const eventId = new Date().getTime(); // TODO: log exception
      this.info(`Captured exception ID: "${eventId}".`, exception);
    } catch (error) {
      this.error('Failed to capute exception.', exception, error);
    }
  }
}
