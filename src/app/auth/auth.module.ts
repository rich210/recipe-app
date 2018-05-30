
import { NgModule } from '@angular/core';

import { SharedModule } from '../modules/shared.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule {}
