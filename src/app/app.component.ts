import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  title = 'app';

  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit() {
    console.log("oninit");
    this.store.dispatch(new AuthActions.AutoLogin());
    firebase.initializeApp({
      apiKey: 'AIzaSyA-4uoS0Oe0cedLlGT0R0b8kUfyyNsLxSo',
      authDomain: 'ng-recipe-book-51b89.firebaseapp.com',
    });
  }


  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
