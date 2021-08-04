import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, currencySign: string = '€'): string {
    return `${value.toFixed(2)} ${currencySign}`;
  }

}
