import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../modules/shared/shared/shared.module';
import { PostCreateModule } from './post-create/post-create.module';
import { PostDetailModule } from './post-detail/post-detail.module';
import { PostsListModule } from './posts-list/posts-list.module';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, SharedModule, PostCreateModule, PostsListModule, PostDetailModule],
  exports: [PostsComponent],
})
export class PostsModule {}
