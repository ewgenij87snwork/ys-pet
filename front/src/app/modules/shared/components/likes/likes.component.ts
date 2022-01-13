import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostHttpService } from '../../../../services/post-http/post-http.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  @Input() likes: number | undefined = 0;
  @Input() editable = false;
  @Input() postId!: string;

  @Output() likeCallback = new EventEmitter<any>();

  constructor(private _postHttpService: PostHttpService) {}

  ngOnInit(): void {}

  public updateLikes(): void {
    this._postHttpService.updateLikes(this.postId, '38457someUserId').subscribe(res => {
      this.likes = res.likes;
    });
  }
}
