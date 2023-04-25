import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByKey'
})

export class FilterByKeyPipe implements PipeTransform {

  transform(array: any[], inputValue?: string, search1?: string | null, search2?: string | null): any {
      if(!array) return null;
      if(!inputValue?.length) return array;
      inputValue = inputValue.toLowerCase();

      if (search2) {
        return array.filter(x => x[`${search1}`].toLowerCase().includes(inputValue) ||
        x[`${search2}`]?.toLowerCase()?.includes(inputValue))
      }
      return array.filter(x => x[`${search1}`]?.toLowerCase()?.includes(inputValue))
  }

}
