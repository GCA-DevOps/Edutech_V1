import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { ExpenseModel } from '../components/pages/Account/expenses/add-expense/Expense';
import { Observable,map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor( private http : HttpClient) { }

  apiurl='http://172.16.8.142:9030/api/v1/'
  headers= new HttpHeaders().set('Content type','application/json')

  //GetExpense() {
    
   // return this.http.get<ExpenseModel[]>(this.apiurl)
   
 // }

  feeStatement(data: any): Observable<any> {
    let API_URL = `http://172.16.8.142:9030/api/v1/students/student/list_student_virtual_account?page=1
    `;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {

      console.log(res , "response")
      return res || {}
    }), 

    )
  }



  
  searchStudent(search_param: any): Observable<any> {
    const url = `${environment.apiUrl}students/students/${search_param}`
    return this.http.get<any>(url);
  }

  loadfeecategories(): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/`
    return this.http.get<any>(url);
  }

  postfeepayment(data: any): Observable<any> {
    const url = `${environment.apiUrl}fees/pay/`

    return this.http.post(url, data).pipe(map(res => {
      console.log(res , "response")
      return res || {}
    }), 

    )
  }
   
}
