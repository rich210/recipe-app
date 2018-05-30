import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeHolderComponent } from './recipe-holder/recipe-holder.component';
import { RecipeBooksComponent } from './recipe-books.component';
import { Routes, RouterModule } from '@angular/router';


const recipesRoutes: Routes = [
  {
    path: '', component: RecipeBooksComponent,
    children: [
      { path: '', component: RecipeHolderComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent, canActivate: [AuthGuard] },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule {}
