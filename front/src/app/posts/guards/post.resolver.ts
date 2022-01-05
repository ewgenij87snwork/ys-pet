import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { Post } from '../../modules/shared/interfaces/post.interface';
import { PostHttpService } from '../../services/post-http/post-http.service';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<Post> {
  constructor(private router: Router, private _postHttpService: PostHttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!route.paramMap.has('postId')) {
      this.router.navigate(['/']);
      return of(null);
    }

    const postId = route!.paramMap!.get('postId');

    return this._postHttpService.getPosts().pipe(
      map(res => {
        return res[postId!];
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/']);
        return of(null);
      }),
    );
  }
}
