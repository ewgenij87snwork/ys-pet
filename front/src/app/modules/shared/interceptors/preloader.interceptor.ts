import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { PreloaderService } from '../../../services/preloader/preloader.service';

@Injectable()
export class PreloaderInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _preloader: PreloaderService, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._preloader.show();
    return next.handle(req).pipe(
      tap(() => {}),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 404:
              this.router.navigate(['/404']);
              break;
            case 500:
              this.toastr.warning(err.error.error.message, '', { timeOut: 3000 });
              break;
            default:
              console.error(err.message);
              break;
          }
        }
        return throwError(err);
      }),
      finalize(() => {
        this._preloader.hide();
      }),
    );
  }
}
