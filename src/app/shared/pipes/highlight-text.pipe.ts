import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: string, arg: string): any {
    if (arg && value) {
      value = String(value);
      const startIndex = value.toLowerCase().indexOf(arg.toLowerCase());

      const endLength = arg.length;
      const matchingString = value.substr(startIndex, endLength);
      if (startIndex !== -1) {
        return value.replace(matchingString, `<strong>${matchingString}</strong>`);
      }
    }
    return value;
  }

}
