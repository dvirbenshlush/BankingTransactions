import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { selectTransactions } from '../../state/bank/transaction.selectors';
import { TransactionActions } from '../../state/bank/transaction.actions';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<ReadonlyArray<Transaction>> = this.store.select(selectTransactions);
  displayedColumns: string[] = ['accountNumber', 'amount', 'status', 'externalTransactionId', 'identityNumber', 'transactionDate'];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TransactionActions.loadTransactionHistory());
  }
}
