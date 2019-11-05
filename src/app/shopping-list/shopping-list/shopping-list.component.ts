
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping.list.actions';
import * as ShoppingListReducer from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<ShoppingListReducer.State>;
  isShoppingMode = false;
  selectedIngredients: Array<Ingredient> = [];
  ingredients : Ingredient[] = [];
  categories: string[] = [];
  subscription: Subscription;
  hasError: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(shoppingListState => {
        console.log(shoppingListState.ingredients);
        console.log(shoppingListState.categories);
        this.ingredients = shoppingListState.ingredients;
        this.categories = shoppingListState.categories;
      });
  }

  onEditItem(ingredient: Ingredient) {
    if (this.isShoppingMode) {
      const index = this.isInArray(ingredient);
      if (index > -1) {
        this.selectedIngredients.splice(index, 1);
      } else {
        this.selectedIngredients.push(ingredient);
      }
    }
    this.store.dispatch(new ShoppingListActions.StartEdit(ingredient));
  }

  onClearAllShoppingList() {
    this.store.dispatch(new ShoppingListActions.SetIngredients([]));
  }

  isInArray(ingredient: Ingredient) {
    return this.selectedIngredients.findIndex(
      (i) => {
        return i.name === ingredient.name;
      }
    );
  }
}
