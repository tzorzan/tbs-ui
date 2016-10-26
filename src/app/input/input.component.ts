import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent {

  private personName: string;

  @Output()
  onBook = new EventEmitter<string>();

  bookPerson() {
    if (this.personName.trim().length) {
      this.onBook.emit(this.personName)
      this.personName = '';
    }
  }

}
