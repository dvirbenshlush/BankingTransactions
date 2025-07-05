import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../models/transaction.model";
import { TransactionRequest } from "../models/transaction-request.model";
import { ApiResponse } from "../models/api-response.model";

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = 'https://localhost:7064/api/';

  constructor(private http: HttpClient) {}

  getTransactionHistory(): Observable<Array<Transaction>> {
    return this.http.get<Transaction[]>(this.apiUrl + 'Transactions/GetAllTransactions');
  }

  createTransaction(transaction: TransactionRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'Transactions/CreateTransaction', transaction);
  }

  updateTransaction(transaction: Transaction): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'Transactions/UpdateTransaction', transaction);
  }

  deleteTransaction(transactionDate: Date): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}Transactions/DeleteTransaction?transactionDate=${transactionDate}`);
  }
}
