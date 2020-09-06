import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'fury-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private sb: Subscription;

  public param: string;

  constructor(private productsService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snack: MatSnackBar) { }

  async ngOnInit() {

    /** Initialize all inputs to prevent errors */
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      img: ['']
    })

    this.param = await this.checkParams();


    if (this.param) {
      /** Load data */
      this.loadProductData(this.param);
      return;
    }

  }

  loadProductData(productId) {
    this.sb = this.productsService.getProductById(productId)
      .subscribe((data: any) => {
        let productData = data.message;
        console.log(data);
        /** Set new values */
        this.form.setValue({
          title: productData.title,
          description: productData.description,
          price: productData.price,
          stock: productData.stock,
          img: productData.img || 'https://material.angular.io/assets/img/examples/shiba2.jpg'
        })

      })
  }

  checkParams() {
    return new Promise<string>((resolve, reject) => {
      this.sb = this.activatedRoute.params.subscribe(param => {
        if (param['id']) resolve(param['id']);
        else resolve(null);
      })
    });
  }

  send() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    let array = this.setArray();

    /** Then, all values all good, we build data object */
    let data: any = {};

    array.forEach(item => {
      data[item] = this.form.controls[item]?.value;
    });

    /** Then we call the service */
    this.sb = this.productsService.createProduct(data)
      .subscribe(data => {
        this.snack.open('Producto creado!', 'CERRAR', { duration: 3000 })
        this.router.navigate(['/products/list']);
      })

  }

  update() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    let array = this.setArray();

    /** Then, when all values are well, we build data object */
    let propertiesToUpdate: any = {};

    array.forEach(item => {
      propertiesToUpdate[item] = this.form.controls[item]?.value;
    });

    /** Then we call the service */
    this.sb = this.productsService.updateProduct({ propertiesToUpdate }, this.param)
      .subscribe(data => {
        this.snack.open('Producto editado!', 'CERRAR', { duration: 3000 })
        this.router.navigate(['/products/list']);
      })
  }

  setArray() {
    /** If an image isn't sended, then we just send nothing to set an optional one */
    let array = ['title', 'description', 'price', 'stock', 'img'];

    if (this.form.get("img").value.includes('https://material.angular.io/assets/img/examples/shiba2.jpg') || this.form.get("img").value == '') {
      let index = array.indexOf("img");
      array.splice(index, 1);
    }

    return array;
  }

  ngOnDestroy() {
    this.sb?.unsubscribe();
  }

}
