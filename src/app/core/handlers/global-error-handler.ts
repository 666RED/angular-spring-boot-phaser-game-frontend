import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(err: HttpErrorResponse) {
    const errorMessage = err?.error?.message ?? 'unknown error';

    console.error(GlobalErrorHandler.name, { err });
    console.log(errorMessage);
  }
}
