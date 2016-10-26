import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

  @Input()
  queue: string[];

  @Output()
  onRemove = new EventEmitter<string>();

  remove(person: string) {
    console.debug("removing " + person);
    this.onRemove.emit(person);
  }

}
