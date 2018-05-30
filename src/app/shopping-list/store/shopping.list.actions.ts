import { Ingredient } from '../../models/ingredient.model';
import { Action } from '@ngrx/store';

export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const STORE_SHOPPING_LIST = 'STORE_SHOPPING_LIST';
export const FETCH_SHOPPING_LIST = 'FETCH_SHOPPING_LIST';
export const SHOPPING_LIST_ERROR = 'SHOPPING_LIST_ERROR';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: {ingredient: Ingredient, days: number}) { }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: {ingredients: Ingredient[], days: number}) { }
}

export class SetIngredients implements Action {
  readonly type = SET_INGREDIENTS;

  constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) { }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;

  constructor() { }
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: Ingredient) { }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class StoreShoppingList implements Action {
  readonly type = STORE_SHOPPING_LIST;
}

export class FetchShoppingList implements Action {
  readonly type = FETCH_SHOPPING_LIST;
}

export class ShoppingListError implements Action {
  readonly type = SHOPPING_LIST_ERROR;
  constructor(public payload: { isBackEnd: boolean, isError: boolean, message: string }) { }
}

export type ShoppingListActions = AddIngredient |
  SetIngredients |
  AddIngredients |
  UpdateIngredient |
  DeleteIngredient |
  StartEdit |
  StopEdit |
  StoreShoppingList |
  FetchShoppingList |
  ShoppingListError;

