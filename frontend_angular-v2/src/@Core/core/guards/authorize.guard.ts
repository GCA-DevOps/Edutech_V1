import { CanActivateFn } from '@angular/router';

export const authorizeGuard: CanActivateFn = (route, state) => {
  return true;
};
