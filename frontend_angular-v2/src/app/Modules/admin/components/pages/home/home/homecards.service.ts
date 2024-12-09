import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomecardsService {
  private totalIncomeUrl = `${environment.apiUrl}payfee/api/v1/fee/list_transaction`;
  private totalExpensesUrl = `${environment.apiUrl}expenses/expenses/`;
  private totalSupplierAmountUrl = `${environment.apiUrl}suppliers/suppliers/calculate_total_amount/`;
  private totalProfitUrl = `${environment.apiUrl}payfee/calculate_profit/`;
  private totalStudents = `${environment.apiUrl}students/students/list/`

  constructor(private http: HttpClient) {}

  getTotalIncome(): Observable<any> {
    return this.http.get<any>(this.totalIncomeUrl);
  }

  getTotalExpenses(): Observable<{ total_expenses: number; expenses: any[] }> {
    return this.http.get<{ total_expenses: number; expenses: any[] }>(this.totalExpensesUrl);
  }

  getTotalSupplierAmount(): Observable<any> {
    return this.http.get<any>(this.totalSupplierAmountUrl);
  }

  getTotalProfit(): Observable<any> {
    return this.http.get<any>(this.totalProfitUrl);
  }
  getTotalStudents(): Observable<any> {
    return this.http.get<any>(this.totalStudents)
  }
}
