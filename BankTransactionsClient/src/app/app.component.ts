import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionsComponent, TransactionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BankTransactionsClient';
}
