import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransactionViewComponent } from './transaction/components/transaction-view/transaction-view.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UpdateProfileComponent } from './user/profile/update-profile/update-profile.component';
import { ViewProfileComponent } from './user/profile/view-profile/view-profile.component';
import { TransactionQueriesComponent } from './transaction/components/transaction-view/transaction-queries/transaction-queries.component';
import { TransactionSearchComponent } from './transaction/components/transaction-view/transaction-queries/transaction-search/transaction-search.component';
import { TransactionFilterComponent } from './transaction/components/transaction-view/transaction-queries/transaction-filter/transaction-filter.component';
import { TransactionTableComponent } from './transaction/components/transaction-view/transaction-table/transaction-table.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { AccountsListComponent } from './account/components/accounts-list/accounts-list.component';
import { AccountTransactionViewComponent } from './account-transaction/components/account-transaction-view/account-transaction-view.component';
import { LoanViewComponent } from './loan/components/loan-view/loan-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'forgotpassword', component: ForgotPasswordComponent },

  { path: 'resetpassword', component: ResetPasswordComponent },

  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', component: ViewProfileComponent },
      { path: 'update', component: UpdateProfileComponent },
    ],
  },
  { path: 'users/:id/accounts', component: AccountsListComponent },
  { path: 'users/:id/loans', component: LoanViewComponent },
  { path: 'accounts/:id', component: AccountTransactionViewComponent },
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
