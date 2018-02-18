import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = localStorage.getItem('auth_token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`).set('Content-Type', 'application/json')
    });
    return next.handle(authReq);
  }
}