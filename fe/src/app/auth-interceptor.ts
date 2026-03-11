import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment/env.js';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const username=environment.user;
  const password=environment.password;
  const token=btoa(`${username}:${password}`);

  const authReq = req.clone({
    headers:req.headers.set('Authorization',`Basic ${token}`)
  });

  return next(authReq);
};
