import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountHttpService} from '../../../shared/services/account-http.service';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent implements OnInit {

  savingAccount: any[] = [];
  checkingAccount: any[] = [];
  SAVINGACCOUNTS = 'ACCOUNT_SAVING';
  CHECKINGACCOUNTS = 'ACCOUNT_CHECKING';

  constructor(private route: ActivatedRoute, private http: AccountHttpService) {
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  onAccountSelect(id:number){
    console.log(id);
  }

  loadAccounts(): void {
    const id = this.route.snapshot.params.id;
    this.http.getAccounts(id)
      .subscribe(
        (resp: any) => {
          resp.accounts.forEach((account: any) => {
            if (account.type == this.CHECKINGACCOUNTS) {
              this.checkingAccount.push(account);
            } else if (account.type == this.SAVINGACCOUNTS) {
              this.savingAccount.push(account);
            }
          });
        }
      );
  }

}
