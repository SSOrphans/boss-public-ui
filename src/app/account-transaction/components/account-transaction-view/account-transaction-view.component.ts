import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-transaction-view',
  templateUrl: './account-transaction-view.component.html',
  styleUrls: ['./account-transaction-view.component.css']
})
export class AccountTransactionViewComponent implements OnInit {


  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadAccount();
  }

  loadAccount(): void {
    const id = this.router.snapshot.params.id;
    console.log(id);
  }

}
