import {Component} from '@angular/core';

import {TBSService} from './tbs.service';

import {Status} from "./status";

import {StatusComponent} from './status/status.component';
import {InputComponent} from './input/input.component';
import {ListComponent} from './list/list.component';


@Component({
  selector: 'app-root',
  providers: [TBSService],
  entryComponents: [StatusComponent, InputComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status: Status;

  constructor(private tbsService: TBSService) {}

  ngOnInit(): void {
    this.tbsService.getStatus().then( (status) => {
      this.status = status;
      //TODO: polling using Observables
      //TODO: enhance with WebSockets
      setTimeout(() => this.ngOnInit(), 5000);
    });

  }

  updateStatus(): void {
    this.tbsService.getStatus().then( (status) => {
      this.status = status;
    });
  }

  onBook(person: string) {
    this.tbsService.bookPerson(person).then( () => {
      this.updateStatus();
    });
  }

  onRemove(person: string) {
    this.tbsService.removePerson(person).then( () => {
      this.updateStatus();
    });
  }
}
