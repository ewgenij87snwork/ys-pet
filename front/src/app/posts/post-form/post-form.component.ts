import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs';
import { Post, PostRequest } from '../../modules/shared/interfaces/post.interface';
import { PostHttpService } from '../../services/post-http/post-http.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  public showError = false;
  public postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    subtitle: ['', [Validators.required, Validators.maxLength(100)]],
    text: ['', [Validators.required]],
  });
  public errorMessage: any;
  public post: Post | null = null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private postHttpService: PostHttpService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getPostFromResolver();
  }

  public getControl(controlName: string): FormControl {
    return this.postForm.get(controlName) as FormControl;
  }

  public onSubmit() {
    this.showError = true;

    if (this.postForm.valid) {
      const post: PostRequest = {
        title: this.postForm.value.title,
        subtitle: this.postForm.value.subtitle,
        text: this.postForm.value.text,
      };

      if (!this.post) {
        return this.postHttpService.createPost(post).subscribe(res => {
          this.router.navigate(['posts/detail/', res[0].id]);
          this.showError = false;
        });
      }

      const postId = this.post.id.toString();

      this.postHttpService.updatePost(postId, post).subscribe(res => {
        this.router.navigate(['posts/detail/', res[0].id]);
      });
    }
    this.showError = false;
    return;
  }

  private getPostFromResolver() {
    this.activatedRoute.data.pipe(pluck('post')).subscribe((post: Post[]) => {
      if (post) {
        this.post = post[0];
        if (this.post) {
          const { title, subtitle, text } = this.post;

          this.postForm.setValue({
            title: title,
            subtitle: subtitle,
            text: text,
          });
        }
      }
    });
  }
}
