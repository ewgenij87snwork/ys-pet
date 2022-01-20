import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ys-pet';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') !== undefined) {
      setTimeout(() => {
        this.authService.isLoggedSubject.next(true);
      }, 1);
    }
  }
}
