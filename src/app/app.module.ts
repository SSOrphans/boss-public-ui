import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, DatePipe} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import {HttpService} from './shared/services/http.service';
import {TransactionViewComponent} from './transaction-component/transaction-view/transaction-view.component';
import {TransactionTableComponent} from './transaction-component/transaction-table/transaction-table.component';
import { TransactionSearchComponent } from './transaction-component/transaction-queries/transaction-search/transaction-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionFilterComponent } from './transaction-component/transaction-queries/transaction-filter/transaction-filter.component';
import { TransactionQueriesComponent } from './transaction-component/transaction-queries/transaction-queries.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionViewComponent,
    TransactionTableComponent,
    TransactionSearchComponent,
    TransactionFilterComponent,
    TransactionQueriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    FlexLayoutModule,
  ],
  providers: [HttpService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
