import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionViewComponent} from './transaction-component/components/transaction-view/transaction-view.component';
import {TransactionQueriesComponent} from './transaction-component/components/transaction-view/transaction-queries/transaction-queries.component';
import {TransactionSearchComponent} from './transaction-component/components/transaction-view/transaction-queries/transaction-search/transaction-search.component';
import {TransactionFilterComponent} from './transaction-component/components/transaction-view/transaction-queries/transaction-filter/transaction-filter.component';
import {TransactionTableComponent} from './transaction-component/components/transaction-view/transaction-table/transaction-table.component';

const routes: Routes = [
  {
    path: 'accounts/:id/transactions',
    component: TransactionViewComponent,
    children: [
      {
        path: '',
        component: TransactionTableComponent
      },
      {
        path: '',
        component: TransactionQueriesComponent,
        children: [
          {
            path: '',
            component: TransactionSearchComponent,
          },
          {
            path: '',
            component: TransactionFilterComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
