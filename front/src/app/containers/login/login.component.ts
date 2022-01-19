import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.email, this.password);
  }
}
