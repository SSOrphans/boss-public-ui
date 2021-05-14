import {Component, OnInit} from '@angular/core';
import {AccountHttpService} from '../../../shared/services/account-http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent implements OnInit {
  name: string | undefined;
  balance: string | undefined;
  type: string | undefined;

  constructor(private http: AccountHttpService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadAccount();
  }

  loadAccount() {
    // TODO: Fetch userId somewhere
    const accountId = this.router.snapshot.params.id;
    console.log(accountId);
    try {
      this.http.getAccount(accountId, 1)
        .subscribe(this.setAccountAttributes,
          (error: any) => {
          }
        );
    } catch (err) {
    }
  }

  setAccountAttributes = ({name, balance, type}: any) => {
    this.name = name;
    this.balance = balance;
    this.type = type.substr(8);
  };

}