import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import * as AppReducer from '../store/app.reducers';
import * as AuthReducer from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<AppReducer.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').take(1).map(
      (authState: AuthReducer.State) => {
        return authState.authenticated;
      });
  }

  canLoad(route: Route) {
    return this.store.select('auth').take(1).map((authState: AuthReducer.State) => {
      return authState.authenticated;
    });
  }
}
