import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Username: string;
  Password: string;

  constructor(private router: Router, public afAuth: AngularFireAuth) {
  }

  loginUser() {
    console.log("Username: " + this.Username + " , Password: " + this.Password + " .");

    firebase.auth().signInWithEmailAndPassword(this.Username, this.Password)
      .then(res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      }, err => {
       alert(err.message);
      });
  }

  ngOnInit() {
  }

}
