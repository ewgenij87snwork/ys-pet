import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ngx-custom-validators';
import { AuthService } from '../../services/auth/auth.service';
import { SignupRouting } from './signup-routing';

import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SignupRouting, FormsModule, CustomFormsModule],
  providers: [AuthService],
  exports: [SignupComponent],
})
export class SignupModule {}
