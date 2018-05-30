
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../../models/recipe.model';
import * as AppReducers from '../../store/app.reducers';
import * as AuthReducer from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from './../../recipe-books/store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping.list.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthReducer.State>;
  showNav = false;

  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
    this.store.dispatch(new ShoppingListActions.StoreShoppingList());
  }

  onGetData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
    this.store.dispatch(new ShoppingListActions.FetchShoppingList());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
