import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  transform(value: string, args: string): string {
    return this.htmlToPlainText(value);
  }

  private htmlToPlainText(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }

}
