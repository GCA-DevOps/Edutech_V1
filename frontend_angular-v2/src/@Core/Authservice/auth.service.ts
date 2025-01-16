import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        // Default to relative URL if env is not available
        this.apiUrl = window.env?.apiUrl || '/api/v1/';
        console.log('API URL:', this.apiUrl);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('Client error:', error.error.message);
            return throwError(() => new Error('Client-side error occurred'));
        } else {
            // Server-side error
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was:`, error.error
            );
            return throwError(() => error);
        }
    }

    signout(id: string) {
      throw new Error('Method not implemented.');
    }

    // Method to request an OTP
    requestOtp(email: any): Observable<any> {
        const url = `${this.apiUrl}auth/sendotp/`;
        console.log('Request OTP URL:', url);
        return this.http.post<any>(url, email).pipe(
            catchError(this.handleError)
        );
    }

    // Method to verify OTP
    verifyOtp(body: any): Observable<any> {
        const url = `${this.apiUrl}auth/verifyotp/`;
        console.log('Verify OTP URL:', url);
        return this.http.post<any>(url, body).pipe(
            map(response => {
                if (response.status === 200 && !response.entity) {
                    response.entity = {};
                }
                return response;
            }),
            catchError(this.handleError)
        );
    }

    // Method to login
    login(body: any): Observable<any> {
        const url = `${this.apiUrl}auth/login/`;
        console.log('Login URL:', url);
        console.log('Login request body:', body);
        
        return this.http.post<any>(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).pipe(
            map(response => {
                console.log('Login response:', response);
                if (response.status === 200 && response.entity) {
                    // Save the token if it exists in the response
                    if (response.entity.token) {
                        localStorage.setItem('auth-token', response.entity.token);
                    }
                }
                return response;
            }),
            catchError(this.handleError)
        );
    }

    // Method to reset password
    resetPassword(body: any): Observable<any> {
        const url = `${this.apiUrl}auth/resetpassword/`;
        console.log('Reset password URL:', url);
        return this.http.post<any>(url, body).pipe(
            catchError(this.handleError)
        );
    }

    // Method to handle forgot password
    forgotPassword(email: string): Observable<any> {
        const url = `${this.apiUrl}auth/forgotpassword/`;
        console.log('Forgot password URL:', url);
        return this.http.post<any>(url, { email }).pipe(
            catchError(this.handleError)
        );
    }

    // Method to logout
    logout(): void {
        window.localStorage.removeItem('auth-user');
        window.localStorage.removeItem('auth-token');
    }
}
