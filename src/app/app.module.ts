// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { TransactionHttpService } from './shared/services/transaction-http.service';

// Components
import { AppComponent } from './app.component';

import { TransactionViewComponent } from './transaction/components/transaction-view/transaction-view.component';
import { TransactionTableComponent } from './transaction/components/transaction-view/transaction-table/transaction-table.component';
import { TransactionSearchComponent } from './transaction/components/transaction-view/transaction-queries/transaction-search/transaction-search.component';
import { TransactionFilterComponent } from './transaction/components/transaction-view/transaction-queries/transaction-filter/transaction-filter.component';
import { TransactionQueriesComponent } from './transaction/components/transaction-view/transaction-queries/transaction-queries.component';

import { NavbarComponent } from './shared/layout/navbar/navbar.component';

import { ProfileComponent } from './user/profile/profile.component';
import { ViewProfileComponent } from './user/profile/view-profile/view-profile.component';
import { UpdateProfileComponent } from './user/profile/update-profile/update-profile.component';

import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { AccountsListComponent } from './account/components/accounts-list/accounts-list.component';
import { AccountTransactionViewComponent } from './account-transaction/components/account-transaction-view/account-transaction-view.component';
import { AccountsViewComponent } from './account/components/accounts-view/accounts-view.component';
import { LoanTableComponent } from './loan/components/loan-table/loan-table.component';
import { LoanViewComponent } from './loan/components/loan-view/loan-view.component';
import { CardListComponent } from './card/components/card-list/card-list.component';
import { CardViewComponent } from './card/components/card-view/card-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,

    TransactionViewComponent,
    TransactionTableComponent,
    TransactionSearchComponent,
    TransactionFilterComponent,
    TransactionQueriesComponent,

    ProfileComponent,
    ViewProfileComponent,
    UpdateProfileComponent,

    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,

    AccountsListComponent,
    AccountTransactionViewComponent,
    AccountsViewComponent,

    LoanViewComponent,
    LoanTableComponent,
    CardListComponent,
    CardViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [TransactionHttpService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
