import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest } from '../../modules/shared/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  constructor(private _http: HttpClient) {}

  public updateLikes(postId: string, userId: string): Observable<any> {
    return this._updateLikesRequest(postId, userId);
  }

  public getPosts(): Observable<any> {
    return this._getPostsRequest();
  }

  public getError(): Observable<any> {
    return this._getErrorRequest();
  }

  public getPost(postId: string): Observable<any> {
    return this._getPostRequest(postId);
  }

  public getPostsByTag(tag: string): Observable<any> {
    return this._getPostsByTagRequest(tag);
  }

  public createPost(post: PostRequest): Observable<any> {
    return this._createPostRequest(post);
  }

  public updatePost(postId: string, post: PostRequest): Observable<any> {
    return this._updatePostRequest(postId, post);
  }

  private _updateLikesRequest(postId: string, userId: string): Observable<any> {
    return this._http.put('api/likes', { postId, userId });
  }

  private _getPostsRequest(): Observable<any> {
    return this._http.get('api/posts');
  }

  private _getErrorRequest(): Observable<any> {
    return this._http.get('api/error');
  }

  private _getPostRequest(postId: string): Observable<any> {
    return this._http.get(`api/posts/${postId}`);
  }

  private _getPostsByTagRequest(tag: string): Observable<any> {
    return this._http.get(`api/posts/filter/`, { params: { tag } });
  }

  private _createPostRequest(post: PostRequest): Observable<any> {
    return this._http.post('api/posts', post);
  }

  private _updatePostRequest(postId: string, post: PostRequest): Observable<any> {
    return this._http.patch(`api/posts/${postId}`, post);
  }
}
