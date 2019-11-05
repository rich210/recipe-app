import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { RecipeBookModule } from './recipe-books/recipeBook.module';
import { AuthEffects } from './auth/store/auth.effects';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';
import { SharedModule } from './shared/shared.module';
import { RecipeEffect } from './recipe-books/store/recipe.effects';
import { ShoppingListEffect } from './shopping-list/store/shopping-list.effects';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-universal-app-recipe'}),
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    RecipeBookModule,
    ShoppingListModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, RecipeEffect, ShoppingListEffect]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
