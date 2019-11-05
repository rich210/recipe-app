import * as AppReducer from '../../store/app.reducer';
import { Ingredient } from '../../models/ingredient.model';
import * as ShoppingListActions from './shopping.list.actions';

export interface ShoppingListState extends AppReducer.AppState {
  ingredients: State;
}

export interface State {
  ingredients: Ingredient[];
  categories: string[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
  hasError: boolean;
  errorMessage: string;
}

const initialState: State = {
  ingredients: [
    new Ingredient('apple', 2, 'pz', 'Fruit'),
    new Ingredient('banana', 2, 'pz', 'Fruit'),
  ],
  categories: ['Animal product', 'Fruit', 'Vegetables', 'Flours', 'Legumes', 'Dairy Products', 'Others'],
  editedIngredient: null,
  editedIngredientIndex: -1,
  hasError: false,
  errorMessage: null
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  let localIndex = -1;
  // let recivedIndex = -1;
  switch (action.type) {
    case ShoppingListActions.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: [...action.payload],
        hasError: false
      };
    case ShoppingListActions.ADD_INGREDIENT:
      // Get days
      let recivedIngredient: Ingredient = new Ingredient(action.payload.ingredient.name,
        action.payload.ingredient.amount,
        action.payload.ingredient.amountType,
        action.payload.ingredient.category);
      localIndex = state.ingredients.findIndex(
        (s) => {
          return s.name === recivedIngredient.name;
        }
      );
      // If the object exist in the array, sum the amount multiplied by days e.j Atun 140g for 4 day + atun 280 already existed
      if (localIndex !== -1) {
        state.ingredients[localIndex].amount += (recivedIngredient.amount * action.payload.days);
        return state;
      } else {
        // Multiply amount for days to be added correctly to the shopping list
        recivedIngredient.amount = recivedIngredient.amount * action.payload.days;
        return {
          ...state,
          ingredients: [...state.ingredients, recivedIngredient]
        };
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      const recipeIngredients: Ingredient[] = action.payload.ingredients.slice();
      let _i = recipeIngredients.length - 1;
      while (_i >= 0) {
        localIndex = state.ingredients.findIndex(
          (s) => {
            return s.name === recipeIngredients[_i].name;
          }
        );
        if (localIndex !== -1) {
          state.ingredients[localIndex].amount += recipeIngredients[_i].amount;
          recipeIngredients.splice(_i, 1);
        }
        _i--;
      }
      return {
        ...state,
        ingredients: [...state.ingredients, ...recipeIngredients]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      // TODO: Try to add filter to the delete statment, Look for Course 354 Min 8
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      localIndex = state.ingredients.findIndex(
        (s) => {
          return s.name === action.payload.name;
        }
      );
      const eIngredient = { ...state.ingredients[localIndex] };
      return {
        ...state,
        editedIngredient: eIngredient,
        editedIngredientIndex: localIndex
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.SHOPPING_LIST_ERROR:
      let frontEndMessage: string = null;
      if (action.payload.isBackEnd) {
        console.log(action.payload.message);
      } else {
        frontEndMessage = action.payload.message;
      }
      return {
        ...state,
        hasError: true,
        errorMessage: frontEndMessage
      };
    default: return state;
  }
}
