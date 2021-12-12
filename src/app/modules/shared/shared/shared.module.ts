import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LikesModule } from '../components/likes/likes.module';
import { PageTitleModule } from '../components/page-title/page-title.module';
import { MaterialModule } from './material/material.module';

const MODULES = [ReactiveFormsModule, PageTitleModule, MaterialModule, LikesModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
