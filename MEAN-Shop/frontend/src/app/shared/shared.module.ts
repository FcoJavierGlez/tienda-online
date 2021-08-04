import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { PricePipe } from './pipes/price.pipe';



@NgModule({
  declarations: [
    PricePipe
  ],
  imports: [
    CommonModule, 
    ComponentsModule
  ],
  exports: [
    ComponentsModule,
    PricePipe
  ]
})
export class SharedModule { }
