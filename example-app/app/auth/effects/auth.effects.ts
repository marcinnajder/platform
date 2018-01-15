import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, filter } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AuthActions } from '../actions/auth';
import { User, Authenticate } from '../models/user';
import { choose } from '../../lib';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    choose(a => (a.type === 'AUTH_LOGIN' ? a.payload : null)),
    exhaustMap((auth: Authenticate) =>
      this.authService
        .login(auth)
        .pipe(
          map(
            user =>
              <AuthActions>{ type: 'AUTH_LOGIN_SUCCESS', payload: { user } }
          ),
          catchError(error =>
            of(<AuthActions>{ type: 'AUTH_LOGIN_FAILURE', payload: error })
          )
        )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    filter(a => a.type === 'AUTH_LOGIN_SUCCESS'),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    filter(a => a.type === 'AUTH_REDIRECT' || a.type === 'AUTH_LOGOUT'),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions<AuthActions>,
    private authService: AuthService,
    private router: Router
  ) {}
}
