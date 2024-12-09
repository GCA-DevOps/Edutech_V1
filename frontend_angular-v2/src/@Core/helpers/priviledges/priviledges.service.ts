import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriviledgesService {

  constructor() { }
  priviledgesWorkclasses() {
    return [
      { name: 'DASHBOARD', selected: true, code: 1 },
      { name: 'TRANSACTION MAINTENANCE', selected: false, code: 9 },
      { name: 'INCOME', selected: false, code: 3 },
      { name: 'EXPENSES', selected: false, code: 4 },
      { name: 'USER MANAGEMENT', selected: false, code: 6 },
      { name: 'ACCOUNTS MANAGEMENT', selected: false, code: 7 },
      { name: 'COLLATERALS MANAGEMENT', selected: false, code: 8 },
      { name: 'SETTINGS', selected: false, code: 10 },
      { name: 'REPORTS', selected: false, code: 11 },
      { name: 'ACCESS MANAGEMENT', selected: false, code: 12 },
    ]
  }
}
