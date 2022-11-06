import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TradingRoutingModule } from './trading-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MatCardModule } from '@angular/material/card'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule}  from '@angular/material/button'
import { MatChipsModule } from '@angular/material/chips'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import { ProcessingDialog } from './processing-dialog/processing-dialog.component';

@NgModule({
  declarations: [
    OrdersComponent,
    ConfirmDialog,
    ProcessingDialog,
  ],
  imports: [
    TradingRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  providers: [],
  
})
export class TradingModule { }
