import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from './pipes/format-number.pipe';



@NgModule({
  declarations: [
    FormatNumberPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatNumberPipe
  ]
})
export class SharedModule { }
