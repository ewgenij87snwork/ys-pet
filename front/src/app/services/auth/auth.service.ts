import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedSubject = new BehaviorSubject<boolean>(false);
  public isLoggedSubjectStream$ = this.isLoggedSubject.asObservable();
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  public signup(data: any): void {
    this._signupRequest(data).subscribe(_ => {
      this.toastr.success('Register successful. Now you can Login', '', { timeOut: 3000 });
      this.router.navigate(['login']);
    });
  }

  public login(user: { email: any; password: any }): void {
    this._loginRequest(user).subscribe(res => {
      this.isLoggedSubject.next(!!res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userName', res.data.name);
      this.router.navigate(['/']);
    });
  }

  public logout(): void {
    const userId = localStorage.getItem('userId');
    this.isLoggedSubject.next(false);
    localStorage.clear();

    if (userId) {
      this._logoutRequest(userId).subscribe();
    }
  }

  private _signupRequest(data: any): Observable<any> {
    return this.http.post('api/auth/signup', { data });
  }

  private _loginRequest(user: any): Observable<any> {
    return this.http.post('/api/auth/login', user);
  }

  private _logoutRequest(userId: string): Observable<any> {
    return this.http.post('api/auth/logout', { userId });
  }
}
