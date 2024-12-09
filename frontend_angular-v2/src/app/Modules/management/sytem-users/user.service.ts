import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  addRoles: any;
  updateRoles(id: any, value: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private _http: HttpClient) {}

  addSystemUser(data: any): Observable<any> {
    console.log('saving user');
    var res = this._http.post(`  ${environment.apiUrl}users/create/`, data);
    console.log(res);
    return res;
  }

  updateSystemUser(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.apiUrl}users/update/${id}`, data);
  }

  getSystemUserList(): Observable<any> {
    return this._http.get(`${environment.apiUrl}users/list/`);
  }

  deleteSystemUser(id: number): Observable<any> {
    return this._http.delete(`${environment.apiUrl}users/delete/${id}`);
  }
}
