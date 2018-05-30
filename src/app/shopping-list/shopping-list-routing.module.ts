import { AuthGuard } from '../auth/auth-guard.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { declaredViewContainer } from '@angular/core/src/view/util';
import { NgModule } from '@angular/core';

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
