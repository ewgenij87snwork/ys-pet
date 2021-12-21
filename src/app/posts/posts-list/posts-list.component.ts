import { Component, OnInit } from '@angular/core';
import { Post } from '../../modules/shared/shared/interfaces/post.interface';
import { PostHttpService } from '../../services/post-http.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  public posts: Post[] | null = null;
  private liked = false;

  constructor(private _postHttpService: PostHttpService) {}

  ngOnInit(): void {
    this._postHttpService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

  public like() {}

  updateLikes(postId: number): void {
    this.liked = !this.liked;

    this._postHttpService.updateLikes(postId, this.liked).subscribe(() => {});
  }
}
