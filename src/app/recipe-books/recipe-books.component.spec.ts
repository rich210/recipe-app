import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBooksComponent } from './recipe-books.component';

describe('RecipeBooksComponent', () => {
  let component: RecipeBooksComponent;
  let fixture: ComponentFixture<RecipeBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
