import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../services/token-storage.service';

const noNeedTokenURLS = [
  "login", 
  "forgot-password",
  "reset-password"
]

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
                private authService: AuthService,
                private router: Router,
                private tokenStorageService: TokenStorageService,
                private toastrService: ToastrService
                ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.getToken() != undefined){
      const headers = new HttpHeaders().append('Authorization', `Bearer ${this.authService.getToken()}`);
      const modifiedReq = req.clone({ headers });
      return next.handle(modifiedReq).pipe(catchError(x=> this.handleAuthError(x)));
    }
    return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //this.toastrService.error("Veuillez vous reconnecter s'il vous plaît!");
      this.tokenStorageService.clearAuthSession();
    }
    return throwError(err);
}

  /*
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(modifiedReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && checkUrlNeedToken(modifiedReq.url) && error.status === 401) {
        this.toastrService.error("Veuillez vous reconnecter s'il vous plaît!");
        this.tokenStorageService.clearAuthSession();
        this.router.navigateByUrl('/login');
      }
      return throwError(error);
    })) as any;
  }
  */
}

function checkUrlNeedToken(url: any){
  for(var i=0; i<noNeedTokenURLS.length; i++){
    if(url.includes(noNeedTokenURLS[i])){
      return false;
    }
  }
  return true;
}
