import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  constructor(private _http: HttpClient) {}
  addSupplies(data: any): Observable<any> {
    // Replace the endpoint with your actual API endpoint
    console.log("data", data);
    
    const url = `${environment.apiUrl}suppliers/`;
    return this._http.post<any>(url, data);
    
  }

  updateSupplies(id: number, data: any): Observable<any> {
    // Replace the endpoint with your actual API endpoint
    const url = `${environment.apiUrl}suppliers/${id}`
    return this._http.put(url, data);
  }

  getSuppliesList(): Observable<any> {
    // Replace the endpoint with your actual API endpoint
    return this._http.get(`${environment.apiUrl}suppliers/`);
  }

  deleteSupplies(id: number): Observable<any> {
    // Replace the endpoint with your actual API endpoint
    return this._http.delete(`${environment.apiUrl}${id}`);
  }
}
