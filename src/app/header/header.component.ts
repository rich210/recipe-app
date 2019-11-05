
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../models/recipe.model';
import * as AppReducers from '../store/app.reducer';
import * as AuthReducer from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipe-books/store/recipe.actions';
import * as ShoppingListActions from '../shopping-list/store/shopping.list.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  showNav = false;

  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)).subscribe(user => {
        this.isAuthenticated = !!user;
      });
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

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  

}
