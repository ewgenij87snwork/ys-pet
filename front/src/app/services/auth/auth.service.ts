import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedSubject = new Subject<boolean>();
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

  public login(email: string, password: string): void {
    this._loginRequest(email, password).subscribe(res => {
      this.isLoggedSubject.next(!!res.token);
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('userName', res.name);
      this.router.navigate(['/']);
    });
  }

  public isLogged(): boolean {
    // TODO сделать через сабжект
    const token = localStorage.getItem('token');
    console.log(token);
    return !!token;
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

  private _loginRequest(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password });
  }

  private _logoutRequest(userId: string): Observable<any> {
    return this.http.post('api/auth/logout', { userId });
  }
}
