import { catchError, Observable, of, take, Subject, finalize } from 'rxjs';

export class Perform<T> {
  private readonly destroy$ = new Subject<void>();
  private action$: Observable<T> | undefined;

  data: T | undefined;
  isLoading = false;
  isError = false;
  error: unknown = null;

  load(
    action$: Observable<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: unknown) => void
  ): void {
    this.resetState();
    this.isLoading = true;
    this.action$ = action$;

    this.action$
      .pipe(
        take(1),
        catchError((error: unknown) => {
          this.handleError(error, onError);
          return of(undefined as T);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data: T | undefined) => {
          if (data !== undefined) {
            this.handleSuccess(data, onSuccess);
          }
        },
        error: (error: unknown) => {
          this.handleError(error, onError);
        },
      });
  }

  dispose(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.resetState();
  }

  private resetState(): void {
    this.data = undefined;
    this.isLoading = false;
    this.isError = false;
    this.error = null;
  }

  private handleSuccess(data: T, onSuccess?: (data: T) => void): void {
    this.data = data;
    this.isLoading = false;
    this.isError = false;
    onSuccess?.(data);
  }

  private handleError(
    error: unknown,
    onError?: (error: unknown) => void
  ): void {
    this.data = undefined;
    this.isError = true;
    this.error = error;
    onError?.(error);
  }
}
