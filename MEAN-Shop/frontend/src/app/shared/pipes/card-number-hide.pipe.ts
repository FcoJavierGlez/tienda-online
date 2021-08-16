import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberHide'
})
export class CardNumberHidePipe implements PipeTransform {

  transform(cardNumber: number, ...args: unknown[]): string {
    return "".padStart(`${cardNumber}`.length - 4, '*') + `${cardNumber}`.slice ( `${cardNumber}`.length - 4, `${cardNumber}`.length );
  }

}
