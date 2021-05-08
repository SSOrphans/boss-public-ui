// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpService } from './shared/services/http.service';

// Components
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


@NgModule({
  declarations: [
    AppComponent,
    TransactionViewComponent,
    TransactionTableComponent,
    TransactionSearchComponent,
    ProfileComponent,
    ViewProfileComponent,
    UpdateProfileComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    TransactionFilterComponent,
    TransactionQueriesComponent,
    TransactionFilterComponent,
    TransactionQueriesComponent,
    LoginComponent,
    ForgotPasswordComponent,
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
  ],
  providers: [HttpService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
