import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create.component';
import { FormInputModule } from '../../modules/shared/components/form-input/form-input.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [PostCreateComponent],
    imports: [CommonModule, FormInputModule, ReactiveFormsModule],
    exports: [PostCreateComponent],
})
export class PostCreateModule {}
