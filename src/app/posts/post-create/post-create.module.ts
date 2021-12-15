import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create.component';
import { SharedModule } from '../../modules/shared/shared/shared.module';
import { FormInputModule } from '../../modules/shared/components/form-input/form-input.module';

@NgModule({
    declarations: [PostCreateComponent],
    imports: [CommonModule, SharedModule, FormInputModule],
    exports: [PostCreateComponent],
})
export class PostCreateModule {}
