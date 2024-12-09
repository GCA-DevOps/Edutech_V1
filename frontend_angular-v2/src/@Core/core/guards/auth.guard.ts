import {  CanActivate, CanActivateFn } from '@angular/router';
import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthService } from "../../Authservice/auth.service";
import { TokenStorageService } from "../../Authservice/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router, 
              private tokenStorage: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenStorage.getUser()) {
      const userRole = this.tokenStorage.getUser().role;
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(["/authentication/signin"]);
        return false;
      }
      return true;
    }

    this.router.navigate(["/authentication/signin"]);
    return false;
  }
}

// No @Injectable decorator needed here
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
