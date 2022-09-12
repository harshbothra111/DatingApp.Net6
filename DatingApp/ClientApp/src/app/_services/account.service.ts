import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User | any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }
  login(model: any) {
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}