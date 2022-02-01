import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { PreloaderInterceptor } from './preloader.interceptor';

describe('PreloaderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [PreloaderInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: PreloaderInterceptor = TestBed.inject(PreloaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
