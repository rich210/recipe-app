
import { Observable } from 'rxjs/Rx';

import { EmailValidator, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from '../store/auth.actions';
import * as AppReducer from '../../store/app.reducers';
import * as AuthReducer from '../store/auth.reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authState: Observable<AuthReducer.State>;

  constructor(private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignup({ email: email, password: password }));
  }
}
