import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellsService } from '../sells.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private _formBuilder: FormBuilder) { }

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

  senWpp(){
    window.open(`https://api.whatsapp.com/send?phone=${this.sell.clientPhone}&text=Hola,%20soy%20el%20vendedor%20de%20el producto%20${this.sell.productId.title}!`, '_blank')
  }

}
