import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input('authToken')
  public authToken: string;
  results: string[];
  isContactsUp: boolean;

  constructor(private http: HttpClient) {
  }

  /* ****************** Set the contacts on init ******************** */
  ngOnInit() {
    this.getUserContacts(this.authToken);
  }

  /* Call the API to set the contacts
  *  Called from on init of Contacts component
   *
   * */
  getUserContacts(token): void {
    this.http.get('https://internal-api-staging-lb.interact.io/v2/contacts', {headers: {'Content-Type': 'application/json', 'authToken' : token }}).subscribe(
      res => {
        this.setToken(token);
        this.setResults(res);
        this.isContactsUp = true;
      },
      err => {
        console.log('Error occured');
      }
    );
  }

  /* Set the authentification token */
  setToken(tokenP): void {
    this.authToken = tokenP;
  }

  /* Set the result of the http query to get the contacts  */
  setResults(res): void {
    this.results = res;
  }
}
