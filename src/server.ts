/**
 * Created by yannl on 20/11/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Server {
  constructor (
    private http: Http
  ) {}

  login(id, password) {
    return this.http.get('https://internal-api-staging-lb.interact.io/v2/login')
      .map((res: Response ) => res.json());
  }
}
