import { RecipeEffect } from './store/recipe.effects';
import { recipeReducer } from './store/recipe.reducers';
import { SharedModule } from '../modules/shared.module';
import { ShortenPipe } from '../shared/shorten.pipe';
import { RecipeRoutingModule } from './recipes-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeHolderComponent } from './recipe-holder/recipe-holder.component';
import { RecipeBooksComponent } from './recipe-books.component';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    RecipeBooksComponent,
    RecipeHolderComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    ShortenPipe
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RecipeRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffect])
    ]
})
export class RecipeBookModule {}
