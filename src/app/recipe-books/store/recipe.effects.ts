import { Recipe } from '../../models/recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Actions, Effect } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as RecipeReducers from './recipe.reducers';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class RecipeEffect {
  @Effect()
  recipeFetch = this.actions$.ofType(RecipeActions.FETCH_RECIPES).switchMap(
    (action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-51b89.firebaseio.com/recipes.json');
    }
  ).map(
    (recipes) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    }
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$.ofType(RecipeActions.STORE_RECIPES).withLatestFrom(this.store.select('recipes')).switchMap(
    ([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-51b89.firebaseio.com/recipes.json', state.recipes, {
        reportProgress: true,
        // headers: new HttpHeaders().set('')
      });
      return this.httpClient.request(req);
    }
  );

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<RecipeReducers.RecipeState>) { }
}
