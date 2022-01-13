import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs';
import { Post } from '../../modules/shared/interfaces/post.interface';
import { PostHttpService } from '../../services/post-http/post-http.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post | null = null;
  public showEdit = true;

  constructor(private _postHttpService: PostHttpService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(pluck('post')).subscribe((post: Post[]) => {
      this.post = post[0];
    });
  }

  updateLikes(postId: string): void {
    this._postHttpService.updateLikes(postId, '38457someUserId').subscribe(() => {});
  }

  public onEdit() {
    this.router.navigate(['posts/edit', this.post?.id]);
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
  }
}
