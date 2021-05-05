import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, DatePipe} from '@angular/common';

import {HttpService} from './shared/services/http.service';
import {TransactionViewComponent} from './transaction-component/transaction-view/transaction-view.component';
import {TransactionTableComponent} from './transaction-component/transaction-table/transaction-table.component';
import { TransactionSearchComponent } from './transaction-component/transaction-search/transaction-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    TransactionViewComponent,
    TransactionTableComponent,
    TransactionSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [HttpService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
