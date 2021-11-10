import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const genericRetryStrategy = (
  maxRetryAttempts: number = 2,
  scalingDuration: number = 1000
) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((res, i) => {
      const retryAttempt = i + 1;
      if (
        retryAttempt > maxRetryAttempts ||
        (res.error && res.error.message === 'invalid token')
      ) {
        return throwError(res);
      }
      return timer(retryAttempt * scalingDuration);
    })
  );
};
