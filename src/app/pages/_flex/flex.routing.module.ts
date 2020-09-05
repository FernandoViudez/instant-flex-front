import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexComponent } from './flex.component';
import { AdministrateComponent } from './administrate/administrate.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageComponent } from './packages/package/package.component';
import { DniComponent } from './packages/dni/dni.component';

const routes: Routes = [
  {
    path: '',
    component: FlexComponent,
  },
  {
    path: 'scanner',
    component: FlexComponent,
  },
  {
    path: 'packages',
    component: PackagesComponent,
    children: [
      { path: 'package', component: PackageComponent },
      { path: 'package', component: DniComponent },
    ]
  },
  {
    path: 'administrate',
    component: AdministrateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlexRoutingModule {
}
