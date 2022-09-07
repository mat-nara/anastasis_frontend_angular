import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SliceWordsPipe } from 'src/app/core/pipe/slice-words.pipe';

import { VersionsRoutingModule } from './versions-routing.module';
import { VersionListComponent } from './components/version-list/version-list.component';
import { VersionNewComponent } from './components/version-new/version-new.component';
import { VersionDetailComponent } from './components/version-detail/version-detail.component';

import {MatTableModule} from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 





@NgModule({
  declarations: [
    SliceWordsPipe,
    VersionListComponent,
    VersionNewComponent,
    VersionDetailComponent
    
  ],
  imports: [
    CommonModule,
    VersionsRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule
  ]
})
export class VersionsModule { }
