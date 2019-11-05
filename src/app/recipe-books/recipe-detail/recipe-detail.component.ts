
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as ShoppingListActions from '../../shopping-list/store/shopping.list.actions';
import * as RecipeReducers from '../store/recipe.reducer';
import * as RecipeActions from './../store/recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe  = null;
  id: number;
  index: number;
  ingredients: Ingredient[] = [];
  defaultNumberOfDays = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        console.log(recipe);
        this.recipe = recipe;
        this.ingredients = recipe.ingredients;
      });
  }

  onAddToShoppingList(form: NgForm) {
    const numberOfDays = form.value.numberOfDays;
        for (const ingredient of this.recipe.ingredients) {
          this.store.dispatch(new ShoppingListActions.
            AddIngredient({ ingredient: ingredient, days: numberOfDays }));
        }
  }

  onEditRecipe() {
    this.router.navigate(['../', this.index, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.index));
    this.router.navigate(['/recipeBook']);
  }

}
