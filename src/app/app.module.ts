import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsModule } from './posts/posts.module';
import { HeaderComponent } from './modules/shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared/shared.module';

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [BrowserModule, AppRoutingModule, PostsModule, BrowserAnimationsModule, SharedModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
