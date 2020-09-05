import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellsComponent } from './sells.component';
import { ListSellsComponent } from './list-sells/list-sells.component';
import { ViewSellComponent } from './view-sell/view-sell.component';
import { AddSellComponent } from './add-sell/add-sell.component';

const routes: Routes = [
  {
    path: '',
    component: SellsComponent,
    children: [
      {
        path: 'list',
        component: ListSellsComponent
      },
      {
        path: 'create',
        component: AddSellComponent
      },
      {
        path: 'view/:id',
        component: ViewSellComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellsRoutingModule {
}
