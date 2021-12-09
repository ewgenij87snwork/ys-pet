import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PageTitleModule } from '../../modules/shared/components/page-title/page-title.module';

@NgModule({
    declarations: [PostsListComponent],
    imports: [CommonModule, MatDividerModule, MatIconModule, MatCardModule, MatButtonModule, PageTitleModule],
    exports: [PostsListComponent],
})
export class PostsListModule {}
