
import { FormArray, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../../models/recipe.model';
import * as RecipeReducer from './../store/recipe.reducers';
import * as RecipeActions from './../store/recipe.actions';
// import * as AppReducer from '../../store/app.reducers';
import * as ShoppingListReducer from '../../shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeIndex: number;
  editMode = false;
  recipeForm: FormGroup;
  categories: string[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeStore: Store<RecipeReducer.RecipeState>,
    private shoppingListStore: Store<ShoppingListReducer.ShoppingListState>) { }

  ngOnInit() {
    this.shoppingListStore.select('ingredients').take(1).subscribe(
      (shoppingListState: ShoppingListReducer.State) => {
        this.categories = shoppingListState.categories;
      }
    );
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.recipeIndex = +params['id'];
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.recipeStore.select('recipes').take(1).subscribe(
        (recipeState: RecipeReducer.State) => {
          const recipe = recipeState.recipes[this.recipeIndex];
          console.log(recipe);
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]+\.*[0-9]*$/)]),
                  'amountType': new FormControl(ingredient.amountType, Validators.required),
                  'category': new FormControl(ingredient.category, Validators.required)
                })
              );
            }
          }
        }
      );
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+\.*[0-9]*$/)]),
        'amountType': new FormControl(null, Validators.required),
        'category': new FormControl(Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeStore.dispatch(new RecipeActions.UpdateRecipe({ index: this.recipeIndex, recipe: this.recipeForm.value }));
    } else {
      this.recipeStore.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
