import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private baseUrl = `${environment.apiUrl}expenses/expenses/`;

  constructor(private _http: HttpClient) {}
header =new HttpHeaders ().set ('Content-Type','application/json')
  // For creating a new expense
  addExpenses(data: any): Observable<any> {
    // Replace the endpoint with your actual API endpoint
    console.log("data", data);
    
    const url = `${this.baseUrl}`;
    return this._http.post<any>(url, data ,{headers : this.header });
    
  }
   
  // For updating an existing expense by ID
  updateExpenses(id: number, data: any): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this._http.put<any>(url, data);
  }

  // For fetching the list of expenses
  getExpensesList(): Observable<any> {
    const url = `${this.baseUrl}`
    return this._http.get<any>(url);
  }
   
  // For deleting an expense by ID
  deleteExpenses(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this._http.delete<any>(url);
  }
}
