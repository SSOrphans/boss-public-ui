import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransactionViewComponent } from './transaction/components/transaction-view/transaction-view.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UpdateProfileComponent } from './user/profile/update-profile/update-profile.component';
import { ViewProfileComponent } from './user/profile/view-profile/view-profile.component';
import { RegisterComponent } from './login/register/register.component';
import { TransactionQueriesComponent } from './transaction/components/transaction-view/transaction-queries/transaction-queries.component';
import { TransactionSearchComponent } from './transaction/components/transaction-view/transaction-queries/transaction-search/transaction-search.component';
import { TransactionFilterComponent } from './transaction/components/transaction-view/transaction-queries/transaction-filter/transaction-filter.component';
import { TransactionTableComponent } from './transaction/components/transaction-view/transaction-table/transaction-table.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', component: ViewProfileComponent },
      { path: 'update', component: UpdateProfileComponent },
    ],
  },
  {
    path: 'accounts/:id/transactions',
    component: TransactionViewComponent,
    children: [
      {
        path: '',
        component: TransactionTableComponent,
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
            component: TransactionFilterComponent,
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
