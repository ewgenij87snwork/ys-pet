import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth/auth.service';
import { PreloaderService } from '../../../../services/preloader/preloader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isLoggedSubjectSub: Subscription | undefined;
  public isLogged = false;
  public name: string | null = null;

  constructor(public preloader: PreloaderService, public authService: AuthService, private router: Router) {}

  ngOnDestroy() {
    this.isLoggedSubjectSub?.unsubscribe();
    this.isLoggedSubjectSub = undefined;
  }

  ngOnInit(): void {
    this.isLoggedSubjectSub = this.authService.isLoggedSubjectStream$.subscribe(isLogged => {
      if (isLogged) {
        setTimeout(() => {
          this.name = localStorage.getItem('userName');
        }, 1);
        console.log(isLogged);
        this.isLogged = isLogged;
      }
    });
  }

  public onLogout(): void {
    this.isLogged = false;
    this.name = null;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
