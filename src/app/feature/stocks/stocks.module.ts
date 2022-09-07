import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StocksRoutingModule } from './stocks-routing.module';
import { StockListComponent } from './components/stock-list/stock-list.component';
//import { StockNewComponent } from './components/stock-new/stock-new.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { FormsModule } from '@angular/forms';
import { StockImportComponent } from './components/stock-import/stock-import.component';

import { MatTableModule} from '@angular/material/table'; 
import { MatIconModule} from '@angular/material/icon'; 
import { MatButtonModule} from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field'; 
import { MatCardModule} from '@angular/material/card'; 
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    StockListComponent,
    StockDetailComponent,
    StockImportComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    ReactiveFormsModule,
    FormsModule,
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
export class StocksModule { }
