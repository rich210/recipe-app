import { Ingredient } from '../../models/ingredient.model';
import { Recipe } from '../../models/recipe.model';
import * as RecipeActions from './recipe.actions';
import * as AppReducers from '../../store/app.reducer';

export interface RecipeState extends AppReducers.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('Test', 'Test', 'http://via.placeholder.com/350x150', [
      new Ingredient('apple', 2, 'pz', 'Fruit'),
      new Ingredient('banana', 2, 'pz', 'Fruit')
    ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
    return {
      ...state,
      recipes: [...action.payload]
    };
    case (RecipeActions.ADD_RECIPES):
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.recipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
