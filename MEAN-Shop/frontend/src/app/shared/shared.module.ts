import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { PricePipe } from './pipes/price.pipe';
import { NormalizeDigitsPipe } from './pipes/normalize-digits.pipe';
import { CreditCardLastNumbersPipe } from './pipes/credit-card-last-numbers.pipe';



@NgModule({
  declarations: [
    PricePipe,
    NormalizeDigitsPipe,
    CreditCardLastNumbersPipe
  ],
  imports: [
    CommonModule, 
    ComponentsModule
  ],
  exports: [
    ComponentsModule,
    PricePipe,
    NormalizeDigitsPipe,
    CreditCardLastNumbersPipe
  ]
})
export class SharedModule { }
