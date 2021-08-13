import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { PricePipe } from './pipes/price.pipe';
import { NormalizeDigitsPipe } from './pipes/normalize-digits.pipe';



@NgModule({
  declarations: [
    PricePipe,
    NormalizeDigitsPipe
  ],
  imports: [
    CommonModule, 
    ComponentsModule
  ],
  exports: [
    ComponentsModule,
    PricePipe,
    NormalizeDigitsPipe
  ]
})
export class SharedModule { }
