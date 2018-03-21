import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  transform(value: string, args: string): string {
    let date = new Date(parseInt(value.substring(0,4)), parseInt(value.substring(5,7))-1, parseInt(value.substring(8,10)), parseInt(value.substring(11,13)), parseInt(value.substring(14,16)));
    return date.toLocaleString('en-US');
  }
}