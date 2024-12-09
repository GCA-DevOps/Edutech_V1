import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  private parentsEndpoint = `${environment.apiUrl}parents/parents/`;

  constructor(private _http: HttpClient) {}

  addParent(data: any): Observable<any> {
    console.log('saving user');
    var res = this._http.post(this.parentsEndpoint, data);
    console.log(res);
    return res;
  }

  updateParent(id: number, data: any): Observable<any> {
    return this._http.put(`${this.parentsEndpoint}${id}/`, data);
  }

  getParentList(): Observable<any> {
    return this._http.get(this.parentsEndpoint);
  }

  deleteParent(id: number): Observable<any> {
    return this._http.delete(`${this.parentsEndpoint}${id}/`);
  }
}
