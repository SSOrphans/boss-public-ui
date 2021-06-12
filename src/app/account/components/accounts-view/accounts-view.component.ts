import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountHttpService } from '../../../shared/services/account-http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountsViewComponent implements OnInit {
  id: string | undefined;
  name: string | undefined;
  balance: string | undefined;
  type: string | undefined;

  constructor(
    private http: AccountHttpService,
    private router: ActivatedRoute,
    private redirect: Router
  ) {}

  ngOnInit(): void {
    this.loadAccount();
  }

  ngDoCheck(): void {
    if (!localStorage.getItem('clientPass')) {
      this.redirect.navigate(['/home']);
    }
  }

  loadAccount() {
    // TODO: Fetch userId somewhere
    this.id = this.router.snapshot.params.id;
    const accountId = this.router.snapshot.params.id;
    console.log(accountId);
    try {
      this.http
        .getAccount(accountId, 1)
        .subscribe(this.setAccountAttributes, (error: any) => {});
    } catch (err) {}
  }

  setAccountAttributes = ({ name, balance, type }: any) => {
    this.name = name;
    this.balance = balance;
    this.type = type.substr(8);
  };
}
