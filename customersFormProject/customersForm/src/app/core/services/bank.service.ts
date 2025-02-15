import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BankService {
  private apiUrl = '/api/banks';

  constructor(private http: HttpClient) {}

  getBanks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBranches(bankId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${bankId}/branches`);
  }
}