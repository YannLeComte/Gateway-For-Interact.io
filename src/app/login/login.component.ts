import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public results: string[];
  loginJson: JSON;
  usernameUser: string;
  passwordUser: string;
  loggedIn: boolean;
  authToken: string;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {
    this.loggedIn = false;
  }

  ngOnInit(): void {}


 /* ****************** CALL TO THE API FOR LOGIN ********************** */
  loginUser(usernameP, passwordP): void {
    let body =  JSON.stringify({ username: usernameP, password: passwordP});
    this.http.post('https://internal-api-staging-lb.interact.io/v2/login', body, {headers: {'Content-Type': 'application/json'}}).subscribe(
      res => {
        this.setResults(res);
        this.setUser(usernameP, passwordP, this.results.token.authToken);
        this.loggedIn = true;
      },
      err => {
        console.log('Error occured');
      }
    );
  }


  /* Set the results of the login api query */
  setResults(res): void {
    this.results = res;
  }


  /* Set username and password so we can access it easily */
  setUser(id, pass, authToken): void {
    this.usernameUser = id;
    this.passwordUser = pass;
    this.authToken = authToken;
  }


  /*  Function to logout the user:
   * Called from login.componenent.html when the button logout is clicked
    * */
  logout() {
    this.loggedIn = false;
  }

}
