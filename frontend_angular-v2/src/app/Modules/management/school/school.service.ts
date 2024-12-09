import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class SchoolService {
  
//  getSchoolList() {
//    throw new Error('Method not implemented.');
//  }
//  deleteSchool(id: number) {
//    throw new Error('Method not implemented.');
//  }
 private apiUrl = 'http://172.16.8.142:9030/api/v1/';
 

 constructor(private http: HttpClient) {}

 updateSchool(id: number, schoolData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}schools/schools/${id}/`, schoolData);
 }

 addSchool(schoolData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}schools/schools/`, schoolData);
 }
 deleteSchool(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}schools/schools/${id}/`);
 }
 getSchoolList(): Observable<any> {
  return this.http.get(`${this.apiUrl}schools/schools/`);
 }
}
