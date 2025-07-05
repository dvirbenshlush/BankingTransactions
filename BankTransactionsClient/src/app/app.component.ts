import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionsHistoryComponent, TransactionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BankTransactionsClient';
}
