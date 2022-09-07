import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiHostname+'/api/users')
  }

  addUser(user: any){
    return this.http.post(environment.apiHostname+'/api/users', user);
  }

  getOneUser(id: string) : Observable<User>{
    return this.http.get<User>(environment.apiHostname+'/api/users/'+id);
  }

  updateUser(id: string, user: any): any{
    return this.http.put<any>(environment.apiHostname+'/api/users/'+id, user);
  }

  deleteUser(id: string){
    return this.http.delete(environment.apiHostname+'/api/users/'+id);
  }

  updatePassword(id: string, new_password: any){
    return this.http.put<any>(environment.apiHostname+'/api/auth/update_password/'+id, new_password);
  }
}
