import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let secondsInMinute = 60;
    let minutes = Math.floor(value / secondsInMinute);
    let seconds = value - minutes*secondsInMinute;

    return minutes + " : " + seconds;
  }

}
