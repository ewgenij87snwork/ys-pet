import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './modules/shared/components/header/header.module';
import { PreloaderInterceptor } from './modules/shared/interceptors/preloader.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { PostsModule } from './posts/posts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    PostsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    HeaderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PreloaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
