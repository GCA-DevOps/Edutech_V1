import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
 
  constructor(private _http: HttpClient) {}

  addRoles(data: any): Observable<any> {
    console.log('saving roles');
    var res = this._http.post(`  ${environment.apiUrl}usergroup/create/`,data);
    console.log(res);
    return res;
  }

  updateRoles(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.apiUrl}usergroup/update/${id}`, data);
  }

  getRolesList(): Observable<any> {
    return this._http.get(`${environment.apiUrl}usergroup/list/`);
  }

  deleteRoles(id: number): Observable<any> {
    return this._http.delete(
      `${environment.apiUrl}usergroup/delete/${id}`
    );
  }

}
