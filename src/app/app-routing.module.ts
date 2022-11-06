import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardLayoutComponent } from 'src/app/components/standard-layout/standard-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/trading/orders',
    pathMatch: 'full',
  },
  {
    path: 'trading',
    component: StandardLayoutComponent,
    loadChildren: () => import('./modules/trading/trading.module').then(x => x.TradingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
