import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LikesModule } from './components/likes/likes.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageTitleModule } from './components/page-title/page-title.module';
import { MaterialModule } from './material/material.module';

const MODULES = [ReactiveFormsModule, PageTitleModule, MaterialModule, LikesModule];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
