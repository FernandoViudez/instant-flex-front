import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from './storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private storageService: StorageService, private snack: MatSnackBar ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    const token = this.storageService.getTokenIntoStorage();

    if (!token) {
      return next.handle(req);
    }

    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })

    return next.handle(headers).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) return window.location.href = '/login';

        this.snack.open(err.error.message, 'CERRAR', {duration: 10000})

        return throwError(err);

      })
    )

  }

}
