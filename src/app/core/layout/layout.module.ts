import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';

import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatIconModule }    from  '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';




@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
