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

  constructor(
    private _postHttpService: PostHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(pluck('post')).subscribe((post: Post) => {
      this.post = post;
    });
  }

  updateLikes(postId: number): void {
    this._postHttpService.updateLikes(postId).subscribe(() => {});
  }

  public onEdit() {
    this.router.navigate(['posts/edit', this.post?.id]);
  }
}
