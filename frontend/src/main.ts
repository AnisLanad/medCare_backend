import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoggingInterceptor } from './app/interceptors/logging.interceptor';

// Pour un intercepteur basé sur une classe
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          console.log('Request:', {
            url: req.url,
            method: req.method,
            headers: req.headers.keys().map(key => `${key}: ${req.headers.get(key)}`),
            body: req.body
          });
          return next(req);
        }
      ])
    )
  ]
});

  