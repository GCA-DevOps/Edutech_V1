import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    signout(id: string) {
      throw new Error('Method not implemented.');
    }
    constructor(private http: HttpClient) {}

    // Method to request an OTP
    requestOtp(email: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}auth/sendotp/`, email);
    }

    // Method to verify OTP
    verifyOtp(body: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}auth/verifyotp/`, body).pipe(
            // Handle response to ensure consistency
            map(response => {
                // Check if entity is empty and normalize the response
                if (response.status === 200 && !response.entity) {
                    response.entity = {}; // Ensure entity is always an object
                }
                return response;
            }),
            catchError(error => {
                // Handle error scenarios
                const errorResponse = {
                    message: error.error?.message || 'An error occurred',
                    status: error.status || 500,
                    entity: {} // Provide a consistent empty entity for error cases
                };
                return throwError(errorResponse);
            })
        );
    }

    // Method to login
    login(body: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}auth/login/`, body);
    }

    // Method to logout
    logout(): void {
        window.localStorage.removeItem('auth-user');
        window.localStorage.removeItem('auth-token');
    }

    // Method to reset password
    resetPassword(body: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}auth/resetpassword/`, body);
    }

    // Method to handle forgot password (not used in OTP verification but included here)
    forgotPassword(email: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}auth/forgotpassword/`, { email });
    }
}
