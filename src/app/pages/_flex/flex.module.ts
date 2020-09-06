import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexComponent } from './flex.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { AdministrateComponent } from './administrate/administrate.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageComponent } from './packages/package/package.component';
import { DniComponent } from './packages/dni/dni.component';
import { FlexRoutingModule } from './flex.routing.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [FlexComponent, QrScannerComponent, AdministrateComponent, PackagesComponent, PackageComponent, DniComponent],
  imports: [
    CommonModule,
    FlexRoutingModule,
    MatListModule,
    MaterialModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule,
    ZXingScannerModule,
    MatSnackBarModule
  ]
})
export class FlexModule { }
