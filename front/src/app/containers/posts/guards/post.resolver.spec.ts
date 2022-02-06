import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostResolver } from './post.resolver';

describe('PostResolver', () => {
  let resolver: PostResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    resolver = TestBed.inject(PostResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
