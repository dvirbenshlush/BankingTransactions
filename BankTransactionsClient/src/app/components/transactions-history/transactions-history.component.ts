import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTableModule } from '@angular/material/table';
import { Transaction } from '../../models/transaction.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionActions } from '../../state/bank/transaction.actions';
import { selectTransactions } from '../../state/bank/transaction.selectors';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent implements OnInit {
  transactions$: Observable<ReadonlyArray<Transaction>> = this.store.select(selectTransactions);
  displayedColumns: string[] = [
    'accountNumber',
    'amount',
    'status',
    'transactionDate',
    'actions'
  ];

  constructor(private store: Store, private transactionService: TransactionService) {}

  ngOnInit() {
    this.store.dispatch(TransactionActions.loadTransactionHistory());
  }

  toggleEdit(transaction: Transaction) {
    // transaction.isEditing = !(transaction.isEditing !== undefined ? transaction.isEditing : false);
    const updatedTransaction = { ...transaction, isEditing: !(transaction.isEditing ?? false) };

    if(updatedTransaction.isEditing)
    {
      this.editTransaction(updatedTransaction)
    }
  }

  editTransaction(transaction: Transaction) {
    console.log(`Editing field: for transaction`, transaction);
  }

  deleteField(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction.transactionDate).subscribe(res => console.log(res))
  }
  
}
