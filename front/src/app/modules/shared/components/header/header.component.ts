import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { PreloaderService } from '../../../../services/preloader/preloader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public preloader: PreloaderService, public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
