import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageTitleModule } from '../../modules/shared/components/page-title/page-title.module';
import { SharedModule } from '../../modules/shared/shared/shared.module';
import { PostHttpService } from '../../services/post-http.service';
import { PostsListComponent } from './posts-list.component';

@NgModule({
  declarations: [PostsListComponent],
  imports: [CommonModule, SharedModule, PageTitleModule],
  exports: [PostsListComponent],
  providers: [PostHttpService],
})
export class PostsListModule {}
