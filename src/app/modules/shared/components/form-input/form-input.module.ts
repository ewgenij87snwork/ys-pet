import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared.module';
import { FormInputComponent } from './form-input.component';

@NgModule({
  declarations: [FormInputComponent],
  imports: [CommonModule, MaterialModule, SharedModule],
  exports: [FormInputComponent],
})
export class FormInputModule {}
