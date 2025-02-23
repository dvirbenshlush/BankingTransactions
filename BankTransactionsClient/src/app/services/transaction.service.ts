import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../models/transaction.model";

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = 'https://localhost:7064/api/Transactions/GetAllTransactions';

  constructor(private http: HttpClient) {}

  getTransactionHistory(): Observable<Array<Transaction>> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
