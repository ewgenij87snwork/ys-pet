import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostCreateModule } from './post-create/post-create.module';
import { SharedModule } from '../modules/shared/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { PostsListModule } from './posts-list/posts-list.module';

@NgModule({
    declarations: [PostsComponent],
    imports: [CommonModule, PostCreateModule, SharedModule, MatDividerModule, PostsListModule],
    exports: [PostsComponent],
})
export class PostsModule {}
