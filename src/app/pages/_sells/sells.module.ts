import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellsComponent } from './sells.component';
import { SellsRoutingModule } from './sells.routing.module';
import { ViewSellComponent } from './view-sell/view-sell.component';
import { AddSellComponent } from './add-sell/add-sell.component';
import { ListSellsComponent } from './list-sells/list-sells.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { HighlightModule } from 'src/@fury/shared/highlightjs/highlight.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewSellModalComponent } from './view-sell/view-modal/view-sell-modal.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [SellsComponent, ViewSellComponent, AddSellComponent, ListSellsComponent, ViewSellModalComponent],
  imports: [
    CommonModule,
    SellsRoutingModule,
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
    MatButtonModule,
    MatSortModule,
    MatSliderModule,
    MatProgressBarModule,
    MatGridListModule,
    MatSelectModule
  ]
})
export class SellsModule { }
