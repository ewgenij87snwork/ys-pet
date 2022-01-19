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

  constructor(public preloader: PreloaderService, public authService: AuthService, private router: Router) {}

  ngOnDestroy() {
    this.isLoggedSubjectSub?.unsubscribe();
    this.isLoggedSubjectSub = undefined;
  }

  ngOnInit(): void {
    this.isLoggedSubjectSub = this.authService.isLoggedSubjectStream$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
