import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ScriptService } from "./services/script.service";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { httpInterceptorProviders } from "./interceptors";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    LayoutModule,
    ToastrModule,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [ScriptService, httpInterceptorProviders]
    };
  }
}
