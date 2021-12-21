import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared/shared.module';
import { PostDetailComponent } from './post-detail.component';

@NgModule({
  declarations: [PostDetailComponent],
  imports: [CommonModule, SharedModule],
  exports: [PostDetailComponent],
})
export class PostDetailModule {}
