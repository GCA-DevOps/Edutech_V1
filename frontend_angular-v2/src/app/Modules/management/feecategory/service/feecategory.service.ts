import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeecategoryService {

  constructor(private _http: HttpClient) {}


  create(data: any): Observable<any> {
    return this._http.post(`${environment.apiUrl}`, data);
  }

  // Add a new fee category
  addFeecategory(data: any): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a list of all fee categories
  getFeecategoryList(): Observable<any> {
    const url = `${environment.apiUrl}feeStructure/feeStructure/get_all_fee_structures/`;
    return this._http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  //getFee
  getFee(id: number,term: string):Observable<any> {
    const url = `${environment.apiUrl}fee/details/${id}/${term}`;
    return this._http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getFeestructureById(id:any):Observable<any> {
    const url = `${environment.apiUrl}feeStructure/feeStructure/${id}/get_fee_structure/`; 
    return this._http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getTerms():Observable<any>{
    const url = `${environment.apiUrl}feecategories/terms/`;
    return this._http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Get a single fee category by ID
  getFeeCategoryById(id: number): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/${id}/`;
    return this._http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a fee category by ID
  deleteFeecategory(id: number): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/${id}/`;
    return this._http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing fee category
  updateFeecategory(id: number, data: any): Observable<any> {
    const url = `${environment.apiUrl}feecategories/fee-categories/${id}/`;
    console.log('Updating Fee Category at URL:', url);  // Log the URL to check if it's correct
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put<any>(url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  

  // Centralized error handling
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); // Return the error message to the caller
  }
}
