import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  constructor(private _http: HttpClient) {}

  public updateLikes(postId: number, like?: boolean): Observable<any> {
    return this._updateLikesRequest(postId, like);
  }

  public getPosts(): Observable<any> {
    return this._getPostsRequest();
  }

  public getError(): Observable<any> {
    return this._getErrorRequest();
  }

  private _updateLikesRequest(postId: number, like?: boolean): Observable<any> {
    return of(1);
    // return this._http.post(`/posts/${postId}/likes`, like);
  }

  private _getPostsRequest(): Observable<any> {
    return this._http.get('api/posts');
  }

  private _getErrorRequest(): Observable<any> {
    return this._http.get('api/error');
  }
}
