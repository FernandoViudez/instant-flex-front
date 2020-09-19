import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandFlexRoutingModule } from './demand-flex-routing.module';
import { DemandFlexComponent } from './demand-flex.component';


@NgModule({
  declarations: [DemandFlexComponent],
  imports: [
    CommonModule,
    DemandFlexRoutingModule
  ]
})
export class DemandFlexModule { }
