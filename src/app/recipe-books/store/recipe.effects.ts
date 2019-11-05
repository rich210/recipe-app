
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import * as RecipeReducers from './recipe.reducer';



@Injectable()
export class RecipeEffect {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      console.log('tried to get recipes');
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-51b89.firebaseio.com/recipes.json');
    }),
    map((recipes) => {
      console.log('tried to get recipes');
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients? recipe.ingredients: []
        };
      });
      // for (const recipe of recipes) {
      //   if (!recipe['ingredients']) {
      //     recipe['ingredients'] = [];
      //   }
      // }
      // return {
      //   type: RecipeActions.SET_RECIPES,
      //   payload: recipes
      // };
    }),
    map((recipes) => {
      return new RecipesActions.SetRecipes(recipes);
    }));

  @Effect({dispatch: false})
  recipeStore = this.actions$.ofType(RecipesActions.STORE_RECIPES).pipe(withLatestFrom(this.store.select('recipes')),switchMap(
    ([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-51b89.firebaseio.com/recipes.json', state.recipes, {
        reportProgress: true,
        // headers: new HttpHeaders().set('')
      });
      return this.httpClient.request(req);
    }
  ),);

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<RecipeReducers.RecipeState>) { }
}
