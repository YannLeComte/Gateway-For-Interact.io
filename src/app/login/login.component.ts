import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Cookie } from 'ng2-cookies';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public results: string[];
  username: string;
  loggedIn: boolean;
  authToken: string;
  errorMessage: string;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {
    this.loggedIn = false;
    this.connectionCheck();
  }

  ngOnInit(): void {}

 /* ****************** CALL TO THE API FOR LOGIN ********************** */
  loginUser(usernameP, passwordP): void {
    let body =  JSON.stringify({ username: usernameP, password: passwordP});
    this.http.post('https://internal-api-staging-lb.interact.io/v2/login', body, {headers: {'Content-Type': 'application/json'}}).subscribe(
      res => {
        this.setResults(res);
        this.setUser(usernameP, res['token'].authToken);
        this.errorMessage = '';
        this.loggedIn = true;
      },
      err => {
        console.log('Error occured');
        this.errorMessage = 'The password or the username is incorrect';
      }
    );
  }

  /* ************** CALL THE API FOR USER DETAILS IF CONNECTED*/
  getUser(): void {
    this.http.get('https://internal-api-staging-lb.interact.io/v2/login/details', {headers: {'Content-Type': 'application/json', 'authToken': this.authToken}}).subscribe(
      res => {
        this.setResults(res);
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
  setUser(userN, authToken): void {
    this.username = userN;
    this.authToken = authToken;
    Cookie.set('authToken', authToken);
  }


  /*  Function to logout the user:
   * Called from login.componenent.html when the button logout is clicked
    * */
  logout() {
    this.loggedIn = false;
    Cookie.delete('authToken');
  }

  /* check cookies if already connected */
  connectionCheck(): any {
    if (Cookie.check('authToken')) {
      this.authToken = Cookie.get('authToken');
      this.loggedIn = true;
      this.getUser();
    }
  }
}
