import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultData'
})
export class ProductPipe implements PipeTransform {

  transform(value: string, defaultString: string): string {
      if(value) return value;
      else return defaultString;
  }

}
