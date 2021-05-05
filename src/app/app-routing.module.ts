import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionViewComponent} from './transaction-component/transaction-view/transaction-view.component';

const routes: Routes = [
  {path: 'accounts/:id/transactions', component: TransactionViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
