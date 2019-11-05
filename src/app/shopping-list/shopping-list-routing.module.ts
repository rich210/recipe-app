import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const shoppingListRoute: Routes = [
  { path: '', component: ShoppingListComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [
    RouterModule.forChild(shoppingListRoute)
  ],
  exports: [RouterModule]
})
export class ShoppingListRouting { }
