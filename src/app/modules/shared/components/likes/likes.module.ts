import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { LikesComponent } from './likes.component';

@NgModule({
  declarations: [LikesComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LikesComponent],
})
export class LikesModule {}
