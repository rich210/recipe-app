import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as AuthReducer from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipe-books/store/recipe.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: AuthReducer.State;
  recipes: fromRecipes.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: AuthReducer.authReducer,
  recipes: fromRecipes.recipeReducer
};
