import { Recipe } from '../../models/recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_RECIPES = 'ADD_RECIPES';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const START_EDIT_RECIPE = 'START_EDIT_RECIPE';
export const STOP_EDIT_RECIPE = 'STOP_EDIT_RECIPE';
export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) { }
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPES;

  constructor(public payload: Recipe[]) { }
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, recipe: Recipe}) { }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) { }
}

export class StartEditRecipe implements Action {
  readonly type = START_EDIT_RECIPE;

  constructor(public payload: number) { }
}

export class StopEditRecipe implements Action {
  readonly type = STOP_EDIT_RECIPE;
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipeActions = SetRecipes |
  AddRecipe |
  AddRecipes |
  UpdateRecipe |
  DeleteRecipe |
  StartEditRecipe |
  StopEditRecipe |
  StoreRecipes |
  FetchRecipes;
