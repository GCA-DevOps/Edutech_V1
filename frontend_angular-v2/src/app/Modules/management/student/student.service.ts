import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}

  serverUrl: string = environment.apiUrl;

  add(data: any, action: any, id: any): Observable<any> {
    console.log('saving student');
    let url = "";
    if (action === "add") {
       url = `${this.serverUrl}students/student/create_new_student/`;

       return this._http.post(url, data);
    } else {
       url = `${this.serverUrl}students/student/${id}/`;

       return this._http.put(url, data);
    }
  }

  updateStudent(id: number, data: any): Observable<any> {
    console.log('Updating student with ID:', id);
    console.log('Data to be sent:', data);

    const url = `${this.serverUrl}students/students/${id}/update/`;
    return this._http.put<any>(url, data);
  }

  getStudentList(pageIndex: number, pageSize: number): Observable<any> {
    const url = `${this.serverUrl}students/student/`;
    const params = {
      page: (pageIndex + 1).toString(),
      page_size: pageSize.toString(),
    };
    return this._http.get<any>(url, { params });
  }



  getStudentFee(id: string): Observable<any> {
    const url = `${this.serverUrl}students/student/${id}/get_student_fee_stucture/`
    return this._http.get<any>(url);
  }
  
  deleterecord(url: string): Observable<any> {
    return this._http.delete(url);
  }

  getStudentDetails(uniqueId: string): Observable<any> {
    return this._http.get(`${this.serverUrl}students/students/${uniqueId}`);
  }

  getStudentReport(): Observable<any> {
    const url = `${this.serverUrl}students/student/list_student_virtual_account?page=1`;
    return this._http.get(url);
  }
}
