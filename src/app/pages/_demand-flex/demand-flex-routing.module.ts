import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandFlexComponent } from './demand-flex.component';


const routes: Routes = [
  {
    path: '',
    component: DemandFlexComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandFlexRoutingModule { }
