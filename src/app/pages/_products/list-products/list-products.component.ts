import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fury-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {

  sb: Subscription;
  dataSource: MatTableDataSource<any> | null;

  @Input()
  columns: ListColumn[] = [
    { name: 'Producto', property: 'title', visible: true, isModelProperty: true },
    { name: 'Precio', property: 'price', visible: true, isModelProperty: true },
    { name: 'Stock', property: 'stock', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productsService: ProductService,
    private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit(): void {
    this.sb = this.productsService.getProducts()
      .subscribe((response: any) => {
        this.dataSource.data = response.message;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  /** Redirect actions */

  addProduct() {
    this.router.navigate(['/products/create']);
  }

  updateProduct(productId: string) {
    this.router.navigate(['/products/modify', productId]);
  }

  deleteProduct(productId) {
    if(!confirm('¿Estas seguro que quieres eliminar el producto? ATENCION: Al continuar eliminarás todas las compras relacionadas al mismo.')){
      return;
    }
    
    /** Logic to delete a product */
    this.productsService.deleteProduct(productId)
      .subscribe(data => {
        this.ngOnInit();
      })

  }


  /** .............. */

  ngOnDestroy() {
    this.sb.unsubscribe();
  }
}
