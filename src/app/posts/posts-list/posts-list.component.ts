import { Component, OnInit } from '@angular/core';
import { Post } from '../../modules/shared/shared/interfaces/post.interface';
import { PostHttpService } from '../../services/post-http.service';
import { POSTS_LIST } from './post-list.mock';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  public posts: Post[] = POSTS_LIST;
  private liked = false;

  constructor(private _postHttpService: PostHttpService) {}

  ngOnInit(): void {}

  public like() {}

  updateLikes(postId: number): void {
    this.liked = !this.liked;

    this._postHttpService.updateLikes(postId, this.liked).subscribe(res => {
      console.log(this.liked);
    });
  }
}
