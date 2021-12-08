import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create.component';
import { FormInputModule } from '../../modules/shared/components/form-input/form-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [PostCreateComponent],
    imports: [
        CommonModule,
        FormInputModule,
        ReactiveFormsModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    exports: [PostCreateComponent],
})
export class PostCreateModule {}
