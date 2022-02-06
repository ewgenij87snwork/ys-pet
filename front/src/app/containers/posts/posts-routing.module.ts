import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostResolver } from './guards/post.resolver';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostsListComponent,
      },
      {
        path: 'filter',
        component: PostsListComponent,
      },
      {
        path: 'detail/:postId',
        component: PostDetailComponent,
        resolve: {
          post: PostResolver,
        },
      },
      {
        path: 'create',
        // canActivate: [AuthGuard],
        component: PostFormComponent,
      },
      {
        path: 'edit/:postId',
        component: PostFormComponent,
        resolve: {
          post: PostResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PostResolver],
})
export class PostsRoutingModule {}
