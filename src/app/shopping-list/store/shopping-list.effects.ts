
import {of as observableOf,  Observable } from 'rxjs';

import {withLatestFrom, switchMap, map, catchError} from 'rxjs/operators';
import { isArray } from 'util';
import { Ingredient } from '../../models/ingredient.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';


import { Actions, Effect } from '@ngrx/effects';

import * as ShoppingListReducers from './shopping-list.reducer';
import * as ShoppingListActions from './shopping.list.actions';

@Injectable()
export class ShoppingListEffect {

  @Effect()
  shoppingListFetch = this.actions$.ofType(ShoppingListActions.FETCH_SHOPPING_LIST).pipe(switchMap(
    (action: ShoppingListActions.FetchShoppingList) => {
      return this.httpClient.get<Ingredient[]>('https://ng-recipe-book-51b89.firebaseio.com/shoppingist.json').pipe(
        catchError(
        (err: HttpErrorResponse, caught) => {
          if (err.error instanceof Error) {
            return observableOf({
              isBackEnd: false,
              isError: true,
              message: 'An error occurred:' + err.error.message
            });
          } else {
            return observableOf({
              isBackEnd: true,
              isError: true,
              message: `Backend returned code ${err.status}, body was: ${err.error}`
            });
          }
        }
        ));
    }
  ),map(
    (response) => {
      if (isArray(response) || response == null) {
        const ingredients = response;
        if (ingredients != null) {
          return {
            type: ShoppingListActions.SET_INGREDIENTS,
            payload: ingredients
          };
        } else {
          return {
            type: ShoppingListActions.SET_INGREDIENTS,
            payload: []
          };
        }
      } else {
        return {
          type: ShoppingListActions.SHOPPING_LIST_ERROR,
          payload: response
        };
      }
    }
    ),);

  @Effect({ dispatch: false })
  shoppingListStore = this.actions$.ofType(ShoppingListActions.STORE_SHOPPING_LIST).pipe(
    withLatestFrom(this.store.select('ingredients')),
    switchMap(
    ([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-51b89.firebaseio.com/shoppingList.json', state.ingredients, {
        reportProgress: true,
        // headers: new HttpHeaders().set('')
      });
      return this.httpClient.request(req);
    }
    ),);

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<ShoppingListReducers.ShoppingListState>) { }
}
