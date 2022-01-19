import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormInputModule } from '../../../modules/shared/components/form-input/form-input.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { PostFormComponent } from './post-form.component';

@NgModule({
  declarations: [PostFormComponent],
  imports: [CommonModule, SharedModule, FormInputModule],
  exports: [PostFormComponent],
})
export class PostFormModule {}
