
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping.list.actions';
import * as ShoppingListReducer from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<ShoppingListReducer.State>;
  isShoppingMode = false;
  selectedIngredients: Array<Ingredient> = [];

  constructor(private store: Store<ShoppingListReducer.ShoppingListState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('ingredients');
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
