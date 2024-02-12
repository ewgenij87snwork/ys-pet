import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../modules/shared/validators/must-match.validator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public showError = false;
  public signupForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: MustMatch('password', 'confirmPassword'),
    },
  );

  public errorMessage: any;
  public user: any | null = null;

  public submitted: boolean = false;
  public confirmPassword = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  public getControl(controlName: string): FormControl {
    return this.signupForm.get(controlName) as FormControl;
  }

  onSubmit(): void {
    this.showError = true;
    if (this.signupForm.valid) {
      this.user = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };

      this.authService.signup(this.user);
      this.showError = false;
    }
    return;
  }
}
