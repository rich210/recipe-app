import { Component, OnInit } from '@angular/core';
import * as AppReducers from '../store/app.reducer';
import * as RecipeActions from '../recipe-books/store/recipe.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-books',
  templateUrl: './recipe-books.component.html',
  styleUrls: ['./recipe-books.component.css']
})
export class RecipeBooksComponent implements OnInit {


  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit() {
    console.log('fetch recipes');
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
}
