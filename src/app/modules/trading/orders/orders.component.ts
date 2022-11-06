import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { APIData, APIResponse } from 'src/app/models/api-data.model';
import { Order, OrderStatus } from 'src/app/models/order.model';
import { Asset } from 'src/app/models/asset.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { interval, Subscription } from 'rxjs'
import { ProcessingDialog } from '../processing-dialog/processing-dialog.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'attributes', 'thumbnail', 'price', 'actions'];
  dataSource:Array<Record<string, any>> = []
  subscriptions: Subscription = new Subscription()
  
  constructor(
    private apiService: APIService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.updateList()

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  async updateList() {
    this.apiService.getAPI(new APIData('order/list/sell/open')).subscribe((res) =>{
      const apiRes = res as APIResponse
      if (apiRes.message === 'OK' && apiRes.data && apiRes.data.orders) {
        this.formatItems(apiRes.data.orders, apiRes.data.assets)
      } else {
        console.error('unable to retrieve orders')
      }
    })
  }

  async formatItems(orders:Array<Order>, assets:Array<Asset>) {

    const formatted = []

    for (const order of orders) {
      const asset = assets.find((it) => order.asset_id === it.id)
      formatted.push({
        name: asset?.name,
        attributes: asset?.attributes,
        owner_id: asset?.owner_id,
        url: asset?.url,
        status: order.order_status,
        type: order.order_type,
        amount: order.amount/100,
        currency: order.currency,
        id: order.id,
      })
    }

    this.dataSource = formatted
  }

  async confirmPurchase(orderId:string) {

    const token = localStorage.getItem('token')

    if (!token) {
      let snackBarRef = this.snackBar.open('Please login to purchase', 'Dismiss', { duration: 3000 });
      return
    }

    const dialogRef = this.dialog.open(ConfirmDialog);

    this.subscriptions.add(dialogRef.afterClosed().subscribe(
      (result) => {
        if (result != undefined && result.status === 'confirm') {  
          this.makePurchase(orderId)
        } else {
          let snackBarRef = this.snackBar.open('Purchase cancelled', 'Dismiss', { duration: 3000 });
        }
      }
    ))
    
  }

  async makePurchase(orderId: string) {
    console.log('orderId', orderId)

    this.apiService.postAPI(new APIData('order/purchase', {
      id: orderId,
    })).subscribe((res) => {
      const apiRes = res as APIResponse
      if (apiRes.message === 'OK' && apiRes.data) {
        this.pollForProgress(orderId)
      } else {
      }
    })
  }

  async pollForProgress(orderId: string) {
    const dialogRef = this.dialog.open(ProcessingDialog, {
      disableClose: true,
    });

    let poll:Subscription

    poll = interval(10000).subscribe((x) => {
      
      this.apiService.getAPI(new APIData(`order/${orderId}`)).subscribe((res) =>{
        const apiRes = res as APIResponse
        if (apiRes.message === 'OK' && apiRes.data && apiRes.data.order.order_status !== OrderStatus.OPEN) {
          this.updateList()
          poll.unsubscribe()
          dialogRef.close()
        }
      })
  
    })

    this.subscriptions.add(poll)

    this.subscriptions.add(dialogRef.afterClosed().subscribe(
      (result) => {
        
        let snackBarRef = this.snackBar.open('Purchase completed', 'Dismiss', { duration: 3000 });
      }
    ))
  }

}
