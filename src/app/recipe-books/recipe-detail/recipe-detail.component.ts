import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.model';
import { Recipe } from '../../models/recipe.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping.list.actions';
import * as AppReducer from '../../store/app.reducers';
import * as RecipeReducers from './../store/recipe.reducers';
import * as RecipeActions from './../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeState: Observable<RecipeReducers.State>;
  index: number;
  defaultNumberOfDays = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<RecipeReducers.RecipeState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  onAddToShoppingList(form: NgForm) {
    const numberOfDays = form.value.numberOfDays;
    this.store.select('recipes').take(1).subscribe(
      (recipeState: RecipeReducers.State) => {
        for (const ingredient of recipeState.recipes[this.index].ingredients) {
          this.store.dispatch(new ShoppingListActions.
            AddIngredient({ ingredient: ingredient, days: numberOfDays }));
        }
      }
    );
  }

  onEditRecipe() {
    this.router.navigate(['../', this.index, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.index));
    this.router.navigate(['/recipeBook']);
  }

}
