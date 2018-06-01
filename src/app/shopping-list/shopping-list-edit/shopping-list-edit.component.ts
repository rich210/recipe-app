import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping.list.actions';
import * as ShoppingListReducer from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  categories: string[];
  defaultCategory = 'Fruit';

  constructor(private store: Store<ShoppingListReducer.ShoppingListState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingredients').subscribe(
      data => {
        this.categories = data.categories;
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            amountType: this.editedItem.amountType != null ? this.editedItem.amountType : '',
            category: this.editedItem.category != null ? this.editedItem.category : ''
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddIngredient(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount, form.value.amountType, form.value.category);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient({ingredient: newIngredient, days: 1}));
    }
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
