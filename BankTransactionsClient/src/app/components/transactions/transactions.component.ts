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

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<ReadonlyArray<Transaction>> = this.store.select(selectTransactions);
  displayedColumns: string[] = [
    'accountNumber',
    'amount',
    'status',
    'transactionDate',
    'actions' // הוספת עמודת הפעולות
  ];
  // displayedColumns: string[] = ['accountNumber', 'amount', 'status', 'externalTransactionId', 'identityNumber', 'transactionDate'];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TransactionActions.loadTransactionHistory());
  }

  toggleEdit(transaction: any) {
    transaction.isEditing = !transaction.isEditing;
  }

  editField(transaction: any) {
    console.log(`Editing field: for transaction`, transaction);
    // כאן תוכל להוסיף לוגיקה של שמירה על הערכים המועדים לשינוי
  }

  deleteField(transaction: any) {
    console.log(`Deleting field: for transaction`, transaction);
    // כאן תוכל להוסיף לוגיקה למחיקת ערך מהשדה או מהטרנזקציה
  }
}
