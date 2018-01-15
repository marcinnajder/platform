import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs/interfaces';
import { Observable } from 'rxjs/Observable';

export function choose<T extends Action, R>(
  selector: (a: T) => R | null
): OperatorFunction<T, R> {
  return o =>
    o.pipe(
      map(a => selector(a)),
      filter(a => (a as any) as boolean)
    ) as Observable<R>;
}
