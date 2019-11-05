import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShortenPipe } from '../shared/shorten.pipe';
import { RecipeRoutingModule } from './recipes-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeHolderComponent } from './recipe-holder/recipe-holder.component';
import { RecipeBooksComponent } from './recipe-books.component';
import { SharedModule } from '../shared/shared.module';


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
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RecipeRoutingModule,
    SharedModule
    ]
})
export class RecipeBookModule {}
