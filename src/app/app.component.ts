import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  title = 'app';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA-4uoS0Oe0cedLlGT0R0b8kUfyyNsLxSo',
      authDomain: 'ng-recipe-book-51b89.firebaseapp.com',
    });
  }


  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
