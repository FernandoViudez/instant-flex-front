import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { HighlightModule } from 'src/@fury/shared/highlightjs/highlight.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductPipe } from './product.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ProductsComponent,
    ListProductsComponent,
    CreateProductComponent,
    ProductPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,    
    ReactiveFormsModule,
    HighlightModule,
    FuryCardModule,
    BreadcrumbsModule,
    MatBadgeModule,
    MatPaginatorModule,
    ListModule,
    ProductsRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class ProductsModule { }
