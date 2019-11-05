
import { NgModule } from '@angular/core';
import { CanActivate, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipeBook', pathMatch: 'full' },
  { path: 'recipeBook', loadChildren: '../recipe-books/recipeBook.module#RecipeBookModule' },
  {
    path: 'shoppingList',
    loadChildren: '../shopping-list/shopping-list.module#ShoppingListModule'
  },
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
