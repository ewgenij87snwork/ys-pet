import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleModule } from '../components/page-title/page-title.module';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

const MODULES = [ReactiveFormsModule, PageTitleModule, MaterialModule];

@NgModule({
    declarations: [],
    imports: [CommonModule, ...MODULES],
    exports: [...MODULES],
})
export class SharedModule {}
