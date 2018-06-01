import { Directive, HostListener, HostBinding, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('click') toogleOpen() {

    this.elRef.nativeElement.nextElementSibling.classList.toggle('show');
  }
}
