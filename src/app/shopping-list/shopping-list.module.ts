import { NgModule } from '@angular/core';
import { ShoppingListRouting } from './shopping-list-routing.module';
import { GroupByPipe } from '../shared/group-by.pipe';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
    GroupByPipe
  ],
  imports: [
    SharedModule,
    FormsModule,
    ShoppingListRouting
  ]
})
export class ShoppingListModule {}
