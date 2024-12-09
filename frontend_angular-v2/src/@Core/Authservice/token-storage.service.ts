import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const THEME_KEY = 'theme';
const SCHOOL_NAME_KEY = 'school_name'; // Updated key to maintain consistency

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    // Clear items related to authentication
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveSchoolName(schoolName: string): void {
    window.localStorage.removeItem(SCHOOL_NAME_KEY);
    window.localStorage.setItem(SCHOOL_NAME_KEY, schoolName);
  }

  public getSchoolName(): string | null {
    return window.localStorage.getItem(SCHOOL_NAME_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null; // Return null instead of an empty object
  }

  public saveTheme(theme: any): void {
    console.log("Saving theme:", theme); // Log for debugging (can be removed in production)
    window.localStorage.removeItem(THEME_KEY);
    window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }

  public getTheme(): any {
    const theme = window.localStorage.getItem(THEME_KEY);
    console.log("Getting theme:", theme); // Log for debugging (can be removed in production)
    return theme ? JSON.parse(theme) : null; // Return null if no theme exists
  }
}
