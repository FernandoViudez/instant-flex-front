import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellsService } from '../sells.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewSellModalComponent } from './view-modal/view-sell-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Sell {
  seller: {
    name: string,
    surname: string,
    email: string,
    zone: string,
  },
  productId: {
    title: string,
    description: string,
    price: string,
    stock: string,
    img: string,

  },
  clientName: string,
  clientSurname: string,
  clientDNI: number,
  clientPhone: number,
  postalCode: number,
  clientAdress: string,
  city: string,
  stock: number,
  status: string,
  qrToScan: string
  getDeliverPersonId: number
}

@Component({
  selector: 'fury-view-sell',
  templateUrl: './view-sell.component.html',
  styleUrls: ['./view-sell.component.scss']
})
export class ViewSellComponent implements OnInit {

  private param: string;
  public sell: Sell;
  public isLinear: boolean = true;
  public progress = 33;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private sellService: SellsService,
    private _formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(param => {
        this.param = param["id"];
        this.loadData();
      })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

  }

  loadData() {
    this.sellService.getSellById(this.param)
      .subscribe((data: { message: Sell }) => {

        this.sell = data.message;
        console.log(this.sell);
        this.setStepper(this.sell.status);

      })
  }

  setStepper(status: string) {
    switch (status) { //First step

      /** The firs is must be always activated */

      case 'FLEX_PENDING': // Second step
        this.firstFormGroup.get("firstCtrl").setValue('first_done');
        this.progress = 33;
        break;

      case 'ON_ROUTE': // Third step
        this.firstFormGroup.get("firstCtrl").setValue('first_done');
        this.secondFormGroup.get("secondCtrl").setValue('second_done');
        this.progress = 66;
        break;

      case 'FLEX_HAVE': // Four step in case the flex can't deliver the product in the day
        this.firstFormGroup.get("firstCtrl").setValue('first_done');
        this.secondFormGroup.get("secondCtrl").setValue('second_done');
        this.progress = 75;
        break;

      case 'FINISHED':
        this.firstFormGroup.get("firstCtrl").setValue('first_done');
        this.secondFormGroup.get("secondCtrl").setValue('second_done');
        this.thirdFormGroup.get("thirdCtrl").setValue('third_done');
        this.progress = 100;
        break;

    }
  }

  senWpp() {
    window.open(`https://api.whatsapp.com/send?phone=${this.sell.clientPhone}&text=Hola,%20soy%20el%20vendedor%20de%20el producto%20${this.sell.productId.title}!`, '_blank')
  }

  onQrPrint() {
    let ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write('<html><head><title>Imprimir QR</title>');
    ventana.document.write('</head><body >');
    ventana.document.write(`
    <div style="width: 80%; margin-left: 10%; margin-top: 10%; border: 1px solid black; height: 300px; padding: 3%">
    <img src="${this.sell.qrToScan}" height="150px" style="float: right;">
    <h3 style="float: right; color: grey">Instant Flex Envios</h3>  
      
      <div style="width: 100%;">
        <h3 style="color: lightgrey;">Datos del paquete</h3>
        <span><b>${this.sell.productId.title}</b></span><br>
        <span><b>Precio:</b> ${this.sell.productId.price}</span><br>
        <span><b>Stock:</b> ${this.sell.productId.stock}</span><br>
      </div> 

      <div style="width: 50%; margin-top: 7%; float: left">
        <h3 style="color: lightgrey;">Datos del Cliente</h3>
          <span><b>Nombre y apellido:</b> ${this.sell.clientName} ${this.sell.clientSurname}</span><br>
          <span><b>Teléfono:</b> ${this.sell.clientPhone}</span><br>
          <span><b>DNI:</b> ${this.sell.clientDNI}</span>
      </div>
      
      <div style="width: 50%; float: left;">
      <h3 style="color: lightgrey;">Datos del envío</h3>  
          <span><b>Destino:</b> ${this.sell.clientAdress} ${this.sell.city} - CP${this.sell.postalCode}</span><br>
          <span><b>Nombre del vendedor:</b> ${this.sell.seller.name} ${this.sell.seller.surname}</span><br>
          <span><b>Zona del local:</b> ${this.sell.seller.zone}</span>
      </div>
        
    </div>
      `);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
    return true;
  }

  public takeDeliverService(){
    /** Throw new dialog modal */
    this.matDialog.open(ViewSellModalComponent)
    .afterClosed().subscribe( (data: string) => {
      
      /** Subscribe and call a user flex */
      this.sellService.demandFlex(this.param, { userFlexId: data })
      .subscribe ( data => {
        this.snackBar.open("Venta actualizada, hemos solicitado a su servicio de paquetería solicitado para que recoga el producto! (Hemos pasado sus datos de ubicación y numero de teléfono para establecer una comunicación más constante)", "CLOSE", { duration: 10000 });
        this.ngOnInit();
      })

    })
  }

}
