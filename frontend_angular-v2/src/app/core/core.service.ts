import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  openSnackBar(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private _snackbar:MatSnackBar) { }

  openSnackbar(message:string,action:string = 'ok') {
    this._snackbar.open(message,action,{
      duration: 1000,
      verticalPosition:'top',

    });
  }
}
