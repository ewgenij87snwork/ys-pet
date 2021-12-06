import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostCreateModule } from './post-create/post-create.module';
import { SharedModule } from '../modules/shared/shared/shared.module';

@NgModule({
    declarations: [PostsComponent],
    imports: [CommonModule, PostCreateModule, SharedModule],
    exports: [PostsComponent],
})
export class PostsModule {}
