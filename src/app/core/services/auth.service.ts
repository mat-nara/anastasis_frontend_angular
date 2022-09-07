import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
                private http: HttpClient,
                private router: Router,
                private tokenStorageService: TokenStorageService
                ){}

  login(credential: any) {
    return this.http.post<any>(environment.apiHostname+'/api/login', credential)
            .pipe(
              map((response) => {

                // login successful if there"s a jwt token in the response
                if (response && response.error == 0 && response.id && response.token) {

                  // store user details and token in local storage to keep user logged in between page refreshes
                  this.tokenStorageService.saveToken(response.token);
                  this.tokenStorageService.saveUser(response.userInfo);
                }
                return response;
              })
            );
  }

  logout(): any {
    return this.http.get<any>(environment.apiHostname+'/api/logout');
  }

  getToken(): any {
    return this.tokenStorageService.getToken();
  }

  getUserInfo(): any {
    return this.tokenStorageService.getUser();
  }

  forgotPassword(data: any): any {
    return this.http.post<any>(environment.apiHostname+'/api/send-password-reset-link-email', { email: data.email});
  }

  resetPassword(data: any){
    return this.http.post(environment.apiHostname+'/api/reset-password', data);
  }

}
