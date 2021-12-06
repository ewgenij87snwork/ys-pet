import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputModule } from '../components/form-input/form-input.module';
import { PageTitleModule } from '../components/page-title/page-title.module';

const MODULES = [FormInputModule, PageTitleModule];

@NgModule({
    declarations: [],
    imports: [CommonModule, ...MODULES],
    exports: [...MODULES],
})
export class SharedModule {}
