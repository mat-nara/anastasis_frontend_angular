import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportationComponent } from './importation.component';
import { ImportationRoutingModule } from './importation-routing.module';
import { ScriptService } from 'src/app/core/services/script.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import { MatStepperModule } from '@angular/material/stepper';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatButtonModule } from '@angular/material/button';
//import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ImportationComponent,
  ],
  imports: [
    CommonModule,
    ImportationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //MatStepperModule,
    //MatInputModule,
    //MatFormFieldModule,
    //MatButtonModule
  ],
  exports: [
    ImportationComponent,
  ],
  providers: [
    ScriptService
  ]
})
export class ImportationModule { }
