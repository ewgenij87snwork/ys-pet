import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { Post } from '../../modules/shared/interfaces/post.interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  public showError = false;
  public postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    subtitle: ['', [Validators.required, Validators.maxLength(30)]],
    text: ['', [Validators.required]],
  });
  public errorMessage: any;
  public post: Post | null = null;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPostFromResolver();
  }

  public getControl(controlName: string): FormControl {
    return this.postForm.get(controlName) as FormControl;
  }

  public onSubmit() {
    this.showError = true;
    if (this.postForm.valid) {
      const body = {
        title: this.postForm.value.title,
        subtitle: this.postForm.value.subtitle,
        text: this.postForm.value.text,
      };

      this.showError = false;
    }
  }

  private getPostFromResolver() {
    this.activatedRoute.data.pipe(pluck('post')).subscribe((post: Post) => {
      this.post = post;
      if (this.post) {
        const { title, subtitle, text } = this.post;

        this.postForm.setValue({
          title: title,
          subtitle: subtitle,
          text: text,
        });
      }
    });
  }
}
