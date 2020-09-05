import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexComponent } from './flex.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { AdministrateComponent } from './administrate/administrate.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageComponent } from './packages/package/package.component';
import { DniComponent } from './packages/dni/dni.component';
import { FlexRoutingModule } from './flex.routing.module';



@NgModule({
  declarations: [FlexComponent, QrScannerComponent, AdministrateComponent, PackagesComponent, PackageComponent, DniComponent],
  imports: [
    CommonModule,
    FlexRoutingModule
  ]
})
export class FlexModule { }
