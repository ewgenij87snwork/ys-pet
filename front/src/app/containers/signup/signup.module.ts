import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ngx-custom-validators';
import { FormInputModule } from '../../modules/shared/components/form-input/form-input.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { AuthService } from '../../services/auth/auth.service';
import { SignupRouting } from './signup-routing';

import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SignupRouting, FormsModule, CustomFormsModule, SharedModule, FormInputModule],
  providers: [AuthService],
  exports: [SignupComponent],
})
export class SignupModule {}
