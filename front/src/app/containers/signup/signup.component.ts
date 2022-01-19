import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  newUser = {
    name: '',
    email: '',
    pass: '',
  };

  public submitted: boolean = false;
  public confirmPassword = '';

  constructor(private authService: AuthService) {}

  onSubmit(user: any): void {
    this.authService.signup(user);
  }
}
