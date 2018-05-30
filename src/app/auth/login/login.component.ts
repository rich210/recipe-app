import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';

import * as AuthReducer from '../../auth/store/auth.reducers';
import * as AuthActions from '../store/auth.actions';
import * as AppReducer from '../../store/app.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authState: Observable<AuthReducer.State>;

  constructor(private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
    this.authState =  this.store.select('auth');
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TryLogin({ email: email, password: password }));
  }

  onClear(form: NgForm) {
    form.reset();
  }
}
