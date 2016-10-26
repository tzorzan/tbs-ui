import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Status} from './status';
import {environment} from "../environments/environment";

@Injectable()
export class TBSService {
  private tbsUrl = environment.tbsServiceUrl;
  private statusUrl = '/status';
  private queueUrl = '/queue';
  private dequeUrl = '/dequeue';

  constructor(private http: Http) { }

  getStatus(): Promise<Status> {
    console.debug("Updating status from server ...");

    return this.http.get(this.tbsUrl + this.statusUrl)
      .toPromise()
      .then(response => response.json() as Status)
      .catch(this.handleError);

  }

  bookPerson(person: string): Promise<string> {
    console.debug("Queueing " + person);

    let param = new URLSearchParams();
    param.set("name", person);

    return this.http.post(this.tbsUrl + this.queueUrl + "?" + param.toString(), {})
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  removePerson(person: string): Promise<string> {
    console.debug("Removing " + person + " from queue.");

    let param = new URLSearchParams();
    param.set("name", person);

    return this.http.post(this.tbsUrl + this.dequeUrl + "?" + param.toString(), {})
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
