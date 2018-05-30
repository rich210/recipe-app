
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import * as RecipeReducer from './../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<RecipeReducer.State>;

  constructor(private store: Store<RecipeReducer.RecipeState>) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }
}
