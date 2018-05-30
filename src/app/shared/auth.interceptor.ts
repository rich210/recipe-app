
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as AppReducer from '../store/app.reducers';
import * as AuthReducer from '../auth/store/auth.reducers';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppReducer.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
    .take(1)
    .switchMap(
      (authState: AuthReducer.State) => {
        const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });
        return next.handle(copiedReq);
      }
    );
  }
}
