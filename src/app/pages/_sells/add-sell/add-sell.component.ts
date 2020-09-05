import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SellsService } from '../sells.service';
import { ProductService } from '../../_products/product.service';

@Component({
  selector: 'fury-add-sell',
  templateUrl: './add-sell.component.html',
  styleUrls: ['./add-sell.component.scss']
})
export class AddSellComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private sb: Subscription;
  productsArray: any[];

  constructor(
    private sellsService: SellsService,
    private fb: FormBuilder,
    private router: Router,
    private snack: MatSnackBar,
    private productsService: ProductService) { }

  async ngOnInit() {

    /** Initialize all inputs to prevent errors */
    this.form = this.fb.group({
      clientName: ['', [Validators.required]],
      clientSurname: ['', [Validators.required]],
      clientDNI: ['', [Validators.required]],
      clientPhone: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      clientAdress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      product: ['', [Validators.required]]
    })

    this.productsService.getProducts()
      .subscribe((data: any) => {
        this.productsArray = data.message;
      }, err => {
        return this.snack.open("Es muy probable que no haya quedado stock del producto elegido en relacion con la cantidad demandado por el cliente", 
        'CERRAR', 
        {duration: 5000})
      });

  }

  send() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    /** Then, all values all good, we build data object */
    let data: any = {};
    ['clientName', 'clientSurname', 'clientDNI', 'clientPhone', 'postalCode', 'clientAdress', 'city', 'stock']
      .forEach(item => {
        data[item] = this.form.controls[item]?.value;
      });

    /** Then we call the service */
    this.sb = this.sellsService.createSell(this.form.controls['product']?.value, data)
      .subscribe(data => {
        console.log(data);
        this.snack.open('Venta creada! En la lista de ventas podrá imprir su factura del producto.', 'CERRAR', { duration: 5000 })
        this.router.navigate(['/sells/list']);
      })

  }

  ngOnDestroy() {
    this.sb?.unsubscribe();
  }

}
