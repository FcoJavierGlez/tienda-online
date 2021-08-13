import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeDigits'
})
export class NormalizeDigitsPipe implements PipeTransform {

  transform(digits: number, ...args: unknown[]): string {
    return digits < 10 ? `0${digits}` : `${digits}`;
  }

}
