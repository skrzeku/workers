import { NgModule } from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarConfig,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { MatFileUploadModule } from 'angular-material-fileupload';
import {FormsModule} from "@angular/forms";


const MY_SNACK_GLOBAL_CONFIG: MatSnackBarConfig = {
  duration: 3000,
  verticalPosition: 'bottom',
  horizontalPosition: 'center'
};





const Materials = [
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSliderModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFileUploadModule,
  MatPaginatorModule,
  FormsModule,

];



@NgModule({
  declarations: [],
  exports: [...Materials],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MY_SNACK_GLOBAL_CONFIG
    }
  ]
})
export class MaterialModule { }
