import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../../../../services/preloader/preloader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public preloader: PreloaderService) {}

  ngOnInit(): void {}
}
