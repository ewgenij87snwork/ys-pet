import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostCreateModule } from './post-create/post-create.module';

@NgModule({
    declarations: [PostsComponent],
    imports: [CommonModule, PostCreateModule],
    exports: [PostsComponent],
})
export class PostsModule {}
