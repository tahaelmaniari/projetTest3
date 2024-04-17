import { Pipe, PipeTransform } from '@angular/core';
import {it} from "date-fns/locale";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: any, labelKey?: string): any {
    if (!items || !searchTerm) {
      return items;
    }
    return items.filter(
      item =>
        item[labelKey || 'name']
          .toLowerCase()
          .includes(searchTerm.name.toLowerCase())
    );
  }

}
