import { shoppingListReducer } from './store/shopping-list.reducers';
import { ShoppingListEffect } from './store/shopping-list.effects';
import { ShoppingListRouting } from './shopping-list-routing.module';
import { SharedModule } from '../modules/shared.module';
import { GroupByPipe } from '../shared/group-by.pipe';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
    GroupByPipe
  ],
  imports: [
    SharedModule,
    ShoppingListRouting,
    StoreModule.forFeature('ingredients', shoppingListReducer),
    EffectsModule.forFeature([ShoppingListEffect])
  ]
})
export class ShoppingListModule {}
