
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('recipes').pipe(
      map(recipeState => recipeState.recipes)
    ).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
}
