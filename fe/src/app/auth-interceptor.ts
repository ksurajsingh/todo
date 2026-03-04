import { HttpInterceptorFn } from '@angular/common/http';
import { env } from './environment/env';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const username=env.user;
  const password=env.password;
  const token=btoa(`${username}:${password}`);

  const authReq = req.clone({
    headers:req.headers.set('Authorization',`Basic ${token}`)
  });

  return next(authReq);
};
