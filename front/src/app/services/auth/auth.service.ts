import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedSubject = new Subject<boolean>();
  public isLoggedSubjectStream$ = this.isLoggedSubject.asObservable();
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  public signup(data: any): void {
    this._signupRequest(data).subscribe(_ => {
      // TODO поменять на фолс, когда считаем на странице Логина
      this.router.navigate(['login'], {
        queryParams: {
          loginAfterSignup: true,
        },
        queryParamsHandling: 'merge',
      });
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
    if (userId) {
      this._logoutRequest(userId).subscribe();
    }
    this.isLoggedSubject.next(false);
    localStorage.clear();
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
