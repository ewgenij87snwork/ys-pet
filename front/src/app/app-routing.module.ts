import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./containers/posts/posts.module').then(m => m.PostsModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./containers/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./containers/signup/signup.module').then(m => m.SignupModule),
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
