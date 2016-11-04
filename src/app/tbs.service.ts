import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import { Subject } from 'rxjs/Subject';

let SockJS = require('sockjs-client');
let Stomp = require('stompjs');

import 'rxjs/add/operator/toPromise';

import {Status} from './status';
import {environment} from "../environments/environment";

@Injectable()
export class TBSService {
  private tbsUrl = environment.tbsServiceUrl;
  private websocketUrl = '/tbs-websocket';
  private statusUrl = '/status';
  private queueUrl = '/queue';
  private dequeUrl = '/dequeue';
  private enterUrl = '/enter';
  private exitUrl = '/exit';
  private statusUpdatedSource = new Subject<Status>();

  statusUpdated$ = this.statusUpdatedSource.asObservable();

  constructor(private http: Http) {
    let me = this;
    let socket = new SockJS(this.tbsUrl + this.websocketUrl);
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe('/topic/status', function (status) {
        me.statusUpdatedSource.next(JSON.parse(status.body));
      });
    });
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

  enter(): Promise<string> {
    console.debug("Enter.");

    return this.http.post(this.tbsUrl + this.enterUrl, {})
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  exit(): Promise<string> {
    console.debug("Exit.");

    return this.http.post(this.tbsUrl + this.exitUrl, {})
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
