import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';

import { AuthInterceptor } from '../shared/auth.interceptor';
import { LogginInterceptor } from '../shared/loggin.interceptor';
import { AuthGuard } from '../auth/auth-guard.service';
import { AppRoutingModule } from '../modules/app-routing.module';
import { SharedModule } from '../modules/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: LogginInterceptor, multi: true}
]
})
export class CoreModule { }

