import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CMMRoutingModule } from './cmm-routing.module';
import { CmmListComponent } from './components/cmm-list/cmm-list.component';
import { CmmDetailComponent } from './components/cmm-detail/cmm-detail.component';

import { MatTableModule} from '@angular/material/table'; 
import { MatIconModule} from '@angular/material/icon'; 
import { MatButtonModule} from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field'; 
import { MatCardModule} from '@angular/material/card'; 
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CmmImportComponent } from './components/cmm-import/cmm-import.component';



@NgModule({
  declarations: [
    CmmListComponent,
    CmmDetailComponent,
    CmmImportComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CMMRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule

  ]
})
export class CmmModule { }
