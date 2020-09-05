import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SellsService } from '../sells.service';

@Component({
  selector: 'fury-list-sells',
  templateUrl: './list-sells.component.html',
  styleUrls: ['./list-sells.component.scss'],
})
export class ListSellsComponent implements OnInit, OnDestroy {
  sb: Subscription;
  dataSource: MatTableDataSource<any> | null;

  @Input()
  columns: ListColumn[] = [
    { name: 'Producto', property: 'productId', visible: true, isModelProperty: true },
    { name: 'Cliente', property: 'clientName', visible: true, isModelProperty: true },
    { name: 'Contacto del cliente', property: 'clientPhone', visible: true, isModelProperty: true },
    { name: 'Status', property: 'status', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false },
  ] as ListColumn[];
  pageSize = 10;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private sellServices: SellsService,
    private router: Router) {
      this.dataSource = new MatTableDataSource();
    }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit(): void {
    this.sb = this.sellServices.getSells()
      .subscribe((response: any) => {
        
        for(let item of response.message){
          if(item.status == 'USER_HAVE') item.status = 'El vendedor tiene el paquete';
          if(item.status == 'FLEX_PENDING') item.status = 'En espera de despacho';
          if(item.status == 'ON_ROUTE') item.status = 'El paquete está en camino';
          if(item.status == 'FLEX_HAVE') item.status = 'El servicio de paquetería tiene el paquete';
          if(item.status == 'FINISHED') item.status = 'El producto fué entregado';
        }

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

  addSell() {
    this.router.navigate(['/sells/create']);
  }

  onViewSell(sellId: string) {
    this.router.navigate(['/sells/view', sellId]);
  }

  /** .............. */

  ngOnDestroy() {
    this.sb.unsubscribe();
  }
}
