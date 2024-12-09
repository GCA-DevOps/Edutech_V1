import { CdkTreeModule } from '@angular/cdk/tree';
import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from "@angular/material/select";
import { MatCardModule} from "@angular/material/card";
import { MatRadioModule} from "@angular/material/radio";
import { MatCheckboxModule} from "@angular/material/checkbox";
import { MatTableDataSource, MatTableModule, _MatTableDataSource} from "@angular/material/table";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatSortModule} from "@angular/material/sort";
import { MatDialogModule} from "@angular/material/dialog";
import { MatButtonModule} from "@angular/material/button";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MatIconModule } from "@angular/material/icon";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from "@angular/forms";
import {MatToolbarModule} from '@angular/material/toolbar';
import { PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMenuModule } from "@angular/material/menu";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';







@NgModule({
    imports:[
        
       
    ],
    exports:[
     MatCardModule,
     MatMenuModule,
     MatInputModule,
     MatSelectModule,
     MatRadioModule,
     MatDialogModule,
     MatCheckboxModule,
     MatTableModule,
     MatPaginatorModule,
     MatSortModule,
     MatButtonModule,
     LeafletModule,
     MatIconModule,
     FontAwesomeModule,
     ReactiveFormsModule,
     MatToolbarModule,
     MatFormFieldModule,
     MatNativeDateModule,
     MatDatepickerModule,
     HttpClientModule,
     MatSnackBarModule,
     CdkTreeModule,
     MatTooltipModule,
     MatSidenavModule,
     MatProgressSpinnerModule






  
     

    ]
})
export class MaterialModule {}
