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
    this.tbsService.statusUpdated$.subscribe(
      status => {
        this.status = status;
      }
    );
  }

  onBook(person: string) {
    this.tbsService.bookPerson(person);
  }

  onRemove(person: string) {
    this.tbsService.removePerson(person);
  }
}
