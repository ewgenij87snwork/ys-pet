import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../modules/shared/shared/interfaces/post.interface';
import { PostHttpService } from '../../services/post-http.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post | undefined;
  constructor(private _postHttpService: PostHttpService) {}

  ngOnInit(): void {
    this._postHttpService.getPosts().subscribe(res => {
      this.post = res[0];
    });
  }

  updateLikes(postId: number): void {
    this._postHttpService.updateLikes(postId).subscribe(() => {});
  }
}
