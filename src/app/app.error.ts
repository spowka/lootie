import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'
import * as Sentry from "@sentry/browser";
import { environment } from 'src/environments/environment';
import { TimeoutError } from 'rxjs';

Sentry.init({
  dsn: environment.sentryWebhookUrl,
  environment: environment.production ? 'prod' : 'dev',
});

const isLocal = window.location.href.indexOf('http://localhost') >= 0;

@Injectable({ providedIn: 'root' })

export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  extractError(error) {
    // Try to unwrap zone.js error.
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    // // We can handle messages and Error objects directly.
    if (typeof error === "string" || error instanceof Error) {
      return error;
    }

    if (error) {
      if (error.error instanceof Error) {
        return error.error;
      }
      if (error.error instanceof ErrorEvent) {
        return error.error.message;
      }
    }

    // If it's http module error, extract as much information from it as we can.
    if (error instanceof HttpErrorResponse) {
      // ...or the request body itself, which we can use as a message instead.
      if (typeof error.error === "string") {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }

      // If we don't have any detailed information, fallback to the request message itself.
      return error.message;
    }

    // Skip if there's no error, and let user decide what to do with it.
    try {
      let errorStr = JSON.stringify(error)
      return errorStr.substr(0, 500);
    } catch (err) {
      return null;
    }
  }

  handleError(error) {
    if (!(error instanceof TimeoutError)) {
      const extractedError = this.extractError(error) || "Handled unknown error";
      Sentry.captureException(extractedError);
    }

    // When in development mode, log the error to console for immediate feedback.
    if (!environment.production) {
      console.error(error);
    }

    if (isLocal) {
      return;
    }

    // Optionally show user dialog to provide details on what happened.
    // Sentry.showReportDialog({ eventId });
  }
}
