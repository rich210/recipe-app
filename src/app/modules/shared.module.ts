import { FormsModule } from '@angular/forms';
import { DropdownDirective } from '../shared/dropdown.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ DropdownDirective ],
  exports: [
    CommonModule,
    DropdownDirective,
    FormsModule
  ]
})
export class SharedModule {
}
