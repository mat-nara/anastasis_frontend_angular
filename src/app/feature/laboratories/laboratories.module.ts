import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratoriesRoutingModule } from './laboratories-routing.module';
import { LaboratoryListComponent } from './components/laboratory-list/laboratory-list.component';
import { LaboratoryDetailComponent } from './components/laboratory-detail/laboratory-detail.component';
import { LaboratoryNewComponent } from './components/laboratory-new/laboratory-new.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatCardModule} from '@angular/material/card'; 



@NgModule({
  declarations: [
    LaboratoryListComponent,
    LaboratoryDetailComponent,
    LaboratoryNewComponent
  ],
  imports: [
    CommonModule,
    LaboratoriesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class LaboratoriesModule { }
