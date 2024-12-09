import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeCollectionsService {

  private  totalFeeEndpoint = `${environment.apiUrl}payfee/calculate_total_fee/`;
  private transactionsEndpoint = `${environment.apiUrl}payfee/api/v1/fee/list_transaction`;

  constructor(private http: HttpClient) { }

  getTotalFeeCollections(): Observable<any> {
    return this.http.get<any>(this.totalFeeEndpoint);
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.transactionsEndpoint);
  }
}
