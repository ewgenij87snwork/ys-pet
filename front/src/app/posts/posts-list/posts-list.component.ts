import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../modules/shared/interfaces/post.interface';
import { PostHttpService } from '../../services/post-http/post-http.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  public posts: Post[] | null = null;
  private liked = false;

  constructor(private _postHttpService: PostHttpService, private router: Router, private route: ActivatedRoute) {
    const { queryParams } = this.route.snapshot;
    const tag = queryParams['tag'];

    if (tag) {
      this._postHttpService.getPostsByTag(tag).subscribe(res => {
        this.posts = res.entities;
      });
    }
  }

  ngOnInit(): void {
    if (!this.posts) {
      this._postHttpService.getPosts().subscribe(res => {
        this.posts = res.entities;
      });
    }
  }

  public like() {}

  updateLikes(postId: number): void {
    this.liked = !this.liked;

    this._postHttpService.updateLikes(postId, this.liked).subscribe(() => {});
  }

  onTagClick(tag: string) {
    const { queryParams } = this.route.snapshot;

    this.router.navigate(['posts/filter'], {
      queryParams: {
        ...queryParams,
        tag: tag,
      },
      queryParamsHandling: 'merge',
    });

    this._postHttpService.getPostsByTag(tag).subscribe(res => {
      this.posts = res.entities;
    });
  }
}
