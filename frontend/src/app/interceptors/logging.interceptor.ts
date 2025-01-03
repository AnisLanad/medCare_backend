import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request:', {
      url: req.url,
      method: req.method,
      headers: req.headers.keys().map(key => `${key}: ${req.headers.get(key)}`),
      body: req.body
    });
    return next.handle(req);
  }
}