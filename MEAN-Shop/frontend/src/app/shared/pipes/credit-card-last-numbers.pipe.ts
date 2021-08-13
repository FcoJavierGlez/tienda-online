import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardLastNumbers'
})
export class CreditCardLastNumbersPipe implements PipeTransform {

  transform(cardNumber: number, ...args: unknown[]): string {
    return `${cardNumber}`.slice( `${cardNumber}`.length -4 , `${cardNumber}`.length );
  }

}
