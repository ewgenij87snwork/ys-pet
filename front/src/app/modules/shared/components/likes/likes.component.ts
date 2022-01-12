import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  @Input() likes: number | undefined = 0;
  @Input() editable = false;

  @Output() likeCallback = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
