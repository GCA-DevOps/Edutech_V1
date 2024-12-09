// // src/app/Modules/admin/services/graph-two.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable, forkJoin } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class GraphTwoService {

//   private incomeUrl = 'http://192.168.91.194/api/v1/payfee/calculate_total_fee/'; // Replace with your API endpoint for income
//   private expenseUrl = 'http://192.168.91.194:8000/api/v1/suppliers/suppliers/calculate_total_amount/'; // Replace with your API endpoint for expense
//   private balanceUrl = 'https://api.example.com/balance'; // Replace with your API endpoint for balance

//   constructor(private http: HttpClient) { }

//   private getLastSixMonths(): string[] {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const result = [];
//     const date = new Date();
    
//     for (let i = 0; i < 6; i++) {
//       result.push(months[date.getMonth()]);
//       date.setMonth(date.getMonth() - 1);
//     }
    
//     return result.reverse();
//   }

//   getChartData(): Observable<{ income: number[], expense: number[], categories: string[] }> {
//     const months = this.getLastSixMonths();
//     let params = new HttpParams();
//     months.forEach(month => {
//       params = params.append('months', month);
//     });

//     const incomeObservable = this.http.get<number[]>(this.incomeUrl, { params });
//     const expenseObservable = this.http.get<number[]>(this.expenseUrl, { params });

//     return new Observable(observer => {
//       forkJoin([incomeObservable, expenseObservable]).subscribe(([incomeData, expenseData]) => {
//         observer.next({
//           income: incomeData,
//           expense: expenseData,
//           categories: months
//         });
//         observer.complete();
//       });
//     });
//   }

//   getTotalIncome(): Observable<number> {
//     return this.http.get<number>(this.incomeUrl);
//   }

//   getTotalExpense(): Observable<number> {
//     return this.http.get<number>(this.expenseUrl);
//   }

//   getTotalBalance(): Observable<number> {
//     return this.http.get<number>(this.balanceUrl);
//   }
// }
