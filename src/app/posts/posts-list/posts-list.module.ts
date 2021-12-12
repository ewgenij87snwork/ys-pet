import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list.component';
import { PageTitleModule } from '../../modules/shared/components/page-title/page-title.module';
import { SharedModule } from '../../modules/shared/shared/shared.module';

@NgModule({
    declarations: [PostsListComponent],
    imports: [CommonModule, SharedModule, PageTitleModule],
    exports: [PostsListComponent],
})
export class PostsListModule {}
