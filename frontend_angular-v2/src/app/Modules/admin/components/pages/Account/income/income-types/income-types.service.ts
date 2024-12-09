import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeTypesService {
  private usersEndpoint = `${environment.apiUrl}users/`;
  private feeCollectionEndpoint = `${environment.apiUrl}payfee/calculate_total_fee/`;

  constructor(private _http: HttpClient) { }

  addIncomeTypes(data: any): Observable<any> {
    return this._http.post(this.usersEndpoint, data);
  }

  updateSystemUser(id: number, data: any): Observable<any> {
    return this._http.put(`${this.usersEndpoint}${id}`, data);
  }

  getSystemUserList(): Observable<any> {
    return this._http.get(this.usersEndpoint);
  }

  deleteSystemUser(id: number): Observable<any> {
    return this._http.delete(`${this.usersEndpoint}${id}`);
  }

  getFeeCollection(): Observable<any> {
    return this._http.get(this.feeCollectionEndpoint);
  }
}
