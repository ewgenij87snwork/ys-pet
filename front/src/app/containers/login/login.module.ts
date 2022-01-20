import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormInputModule } from '../../modules/shared/components/form-input/form-input.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { LoginRouting } from './login-routing';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRouting, FormsModule, SharedModule, FormInputModule],
  exports: [LoginComponent],
})
export class LoginModule {}
