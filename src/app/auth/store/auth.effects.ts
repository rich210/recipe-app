
import { mergeMap } from 'rxjs/operator/mergeMap';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import * as AuthActions from './auth.actions';
import * as RecipeActions from '../../recipe-books/store/recipe.actions';
import * as ShoppingActions from '../../shopping-list/store/shopping.list.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private router: Router) { }

  @Effect()
  authSignup = this.actions$.ofType(AuthActions.TRY_SIGNUP).map(
    (action: AuthActions.TrySignup) => {
      return action.payload;
    }).switchMap(
    (authData: { email: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)).catch(
        (error) => {
          return Observable.of({ isError: true, code: error.code, message: error.message });
        }
      );
    }).switchMap(
    (response) => {
      if (!response.isError) {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      } else {
        return Observable.of(response);
      }
    }).mergeMap(
    (response) => {
      if (!response.isError) {
        return [{
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: response
        }
        ];
      } else {
        return [
          {
            type: AuthActions.AUTH_ERROR,
            payload: { code: response.code, message: response.message }
          }
        ];
      }
    }
    );

  @Effect()
  authLogin = this.actions$.ofType(AuthActions.TRY_LOGIN).map(
    (action: AuthActions.TryLogin) => {
      return action.payload;
    }).switchMap(
    (authData: { email: string, password: string }) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)).catch(
        (error) => {
          return Observable.of({ isError: true, code: error.code, message: error.message });
        }
      );
    }).switchMap(
    (response) => {
      if (!response.isError) {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      } else {
        return Observable.of(response);
      }
    }).mergeMap(
    (response) => {
      if (!response.isError) {
        this.router.navigate(['/recipeBook']);
        return [{
          type: AuthActions.LOGIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: response
        },
        {
          type: RecipeActions.FETCH_RECIPES
        },
        {
          type: ShoppingActions.FETCH_SHOPPING_LIST
        }
        ];
      } else {
        return [{
          type: AuthActions.AUTH_ERROR,
          payload: { code: response.code, message: response.message }
        }];
      }
    }
    );

  @Effect({ dispatch: false })
  authLogout = this.actions$.ofType(AuthActions.LOGOUT).do(
    () => {
      this.router.navigate(['/']);
    }
  );
}

