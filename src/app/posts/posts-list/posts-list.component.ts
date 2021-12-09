import { Component, OnInit } from '@angular/core';
import { Post } from '../../modules/shared/shared/interfaces/post.interface';
import { POSTS_LIST } from './post-list.mock';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
    public posts: Post[] = POSTS_LIST;

    constructor() {}

    ngOnInit(): void {}
}
