import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { PostDetailModule } from './post-detail/post-detail.module';
import { PostFormModule } from './post-form/post-form.module';
import { PostsListModule } from './posts-list/posts-list.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, SharedModule, PostFormModule, PostsListModule, PostDetailModule, PostsRoutingModule],
  exports: [PostsComponent],
})
export class PostsModule {}
