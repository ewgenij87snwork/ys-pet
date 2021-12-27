import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private visible = false;

  constructor() {}

  get isVisible(): boolean {
    return this.visible;
  }

  public hide(): void {
    this.visible = false;
  }

  public show(): void {
    this.visible = true;
  }
}
