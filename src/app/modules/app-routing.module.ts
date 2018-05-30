import { RecipeDetailComponent } from '../recipe-books/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-books/recipe-edit/recipe-edit.component';
import { RecipeHolderComponent } from '../recipe-books/recipe-holder/recipe-holder.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list/shopping-list.component';
import { RecipeBooksComponent } from '../recipe-books/recipe-books.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth-guard.service';
import { SignupComponent } from '../auth/signup/signup.component';
import { HeaderComponent } from '../core/header/header.component';
import { LoginComponent } from '../auth/login/login.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { CanActivate, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'recipeBook',
    component: RecipeBooksComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeHolderComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent, canActivate: [AuthGuard] },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ]
  },
  // {
  //   path: 'recipeBook',
  //   loadChildren: '../recipe-books/recipeBook.module#RecipeBookModule',
  //   canLoad: [AuthGuard]
  // },
  {
    path: 'shoppingList',
    component: ShoppingListComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'shoppingList',
  //   loadChildren: '../shopping-list/shopping-list.module#ShoppingListModule',
  //   canLoad: [AuthGuard]
  // },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
