import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const [hours, minutes] = value.split(':');
    let formattedTime = '';

    // Convert hours to 12-hour format and determine AM/PM
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? 'PM' : 'AM';
    const displayHours = parsedHours % 12 || 12;

    formattedTime = `${displayHours}:${minutes} ${period}`;

    return formattedTime;
  }
}
