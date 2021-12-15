import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input.component';
import { MaterialModule } from '../../shared/material/material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [FormInputComponent],
    imports: [CommonModule, MaterialModule, SharedModule],
    exports: [FormInputComponent],
})
export class FormInputModule {}
