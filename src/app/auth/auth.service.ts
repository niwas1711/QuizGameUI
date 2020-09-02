import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  login(email: string, password: string) {
   let user = {
      email: email,
      password: password
    }
    console.log("Auth", user);
    return this.httpClient.post<any>(`${environment.authURL}authenticate`, user)
    .pipe(map(userreturned => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if(!userreturned.error){
          console.log("User returned", userreturned.user);
          console.log("User returned1", userreturned);
          
          //localStorage.setItem('currentUser', JSON.stringify(userreturned.user));
          //this.currentUserSubject.next(userreturned.user);
          localStorage.setItem('currentUser', JSON.stringify(userreturned));
          this.currentUserSubject.next(userreturned);
          
          return userreturned;
        }
          return null;
    }));
  }
  getCurrentUser(): User{
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user)
      return user.user;
    return null;
  }
  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.authURL}users`)
    .pipe(map(users => {
        return users;
    }));
   }

  register(email: string, username: string, password: string, role: string) {
    let user = 
    {
      username: username,
      password: password,
      email: email,
      role: role
    }
    return this.httpClient.post<any>(`${environment.authURL}users`, user)
    .pipe(map(user => {
        return user;
    }));
  }

  getUsersWithRole(role: string){
    let params = new HttpParams();
    params = params.append('role', role); 
    return this.httpClient.get<User[]>(`${environment.authURL}users`, {params: params})
    .pipe(map(user => {
        return user;
    }));
  }

  upgradeToCreator(email: string){

    return this.httpClient.put<any>(`${environment.authURL}users`, email)
    .pipe(map(user => {
        return user;
    }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get isAdmin() {
    console.log("authservice", this.currentUserValue);
    return this.currentUserValue && this.currentUserValue.role === Role.Admin;
  }

  get isCreator() {
    console.log("authservice", this.currentUserValue.role, Role.Creater);
    return this.currentUserValue && this.currentUserValue.role === Role.Creater;
  }

  
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
