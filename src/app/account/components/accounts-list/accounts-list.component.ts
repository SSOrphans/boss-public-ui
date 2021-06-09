import {Component, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountHttpService} from '../../../shared/services/account-http.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountsListComponent implements OnInit, OnChanges {

  id: number = 0;
  savingAccount: any[] = [];
  checkingAccount: any[] = [];
  accounts: any[] = [];
  SAVING_ACCOUNTS = 'ACCOUNT_SAVING';
  CHECKING_ACCOUNTS = 'ACCOUNT_CHECKING';

  constructor(private router: Router, private route: ActivatedRoute, private httpService: AccountHttpService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadAccounts();
  }

  ngOnChanges() {
    this.loadAccounts();
  }

  onAccountSelect(id: number) {
    this.router.navigate([`accounts/${id}`]);
  }

  onApplyAccount(type: number) {
    try {
      this.httpService.postAccount(type, this.id)
        .subscribe(this.applyAccount, () => {
        });
    } catch (error: any) {
    }
  }

  loadAccounts(): void {
    try {
      this.httpService.getAccounts(this.id)
        .subscribe(
          this.groupAccounts,
          () => {
          }
        );
    } catch (err) {
    }
  }

  groupAccounts = (resp: any) => {
    resp.accounts.forEach(
      (account: any) => {
        if (account.type == this.CHECKING_ACCOUNTS) {
          this.checkingAccount.push(account);
        } else if (account.type == this.SAVING_ACCOUNTS) {
          this.savingAccount.push(account);
        }
      });
  };

  applyAccount = () => {
    this.savingAccount = [];
    this.checkingAccount = [];
    this.ngOnChanges();
  };

}
