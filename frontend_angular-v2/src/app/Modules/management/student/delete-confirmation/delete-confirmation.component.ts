import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
  url!: string  
  isDeleting: boolean = false
  constructor(
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private service: StudentService,
    private dialogRef:MatDialogRef<DeleteConfirmationComponent>
  ){}

  ngOnInit(){
    const urlId = this.data.url
    if (urlId) {
     this.url = urlId
    
    }
  }

  deleteRecord(){
    this.isDeleting = true
    console.log(this.url);
    this.service.deleterecord(this.url).subscribe(
      ((res) => {

      }),
      ((error) =>{
        this.isDeleting = false
        this.snackBar.open('There was An error Deleting This Record', 'Close', {duration:3600, verticalPosition:'top'})
      }),
      () => {
        this.isDeleting = false,
        this.snackBar.open(' Record Deleted Successfully', 'Close', {duration:3600, verticalPosition:'top'})
        this.dialogRef.close()
      }
    )

    
  }

}
