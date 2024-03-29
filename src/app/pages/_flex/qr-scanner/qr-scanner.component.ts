import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { FlexService } from '../flex.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fury-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  scanedCodesArray = [];

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(private flexServices: FlexService, private snack: MatSnackBar) { }

  clearResult(): void {
    this.qrResultString = null;
  }

  ngOnInit(): void {
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(data: string) {

    if(this.scanedCodesArray.find(item => item == data)){
      console.log("Ya lo escaneaste!!");
      return;
    }else{
      this.scanedCodesArray.push(data);
    }

    /** Into position 0 we get the buyId, into position 1, we get the postal code  */
    let buy = data.split("-");
    
    /** Here we add the package ID into packages at sell accounts schema */
    this.flexServices.addNewPackage(buy[0], buy[1])
    .subscribe ( data => {
      return this.snack.open("Producto añadido a la lista!", 'CERRAR', { duration: 5000 });
    })
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }


}
