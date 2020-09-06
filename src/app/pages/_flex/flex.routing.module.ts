import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexComponent } from './flex.component';
import { AdministrateComponent } from './administrate/administrate.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageComponent } from './packages/package/package.component';
import { DniComponent } from './packages/dni/dni.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

const routes: Routes = [
  {
    path: '',
    component: FlexComponent,
  },
  {
    path: 'scanner',
    component: QrScannerComponent,
  },
  {
    path: 'packages',
    component: PackagesComponent,
  },
  {
    path: 'package/:id',
    component: PackageComponent,
  },
  {
    path: 'dni',
    component: DniComponent,
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
