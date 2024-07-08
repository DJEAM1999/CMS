import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

// import { MatTableDataSource } from '@angular/material/table';

const MaterialComponent=[
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatDividerModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormField,
  FormsModule,
  MatFormFieldModule,
  MatIconModule
  // MatTableDataSource

  ];

@NgModule({

  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule { }
