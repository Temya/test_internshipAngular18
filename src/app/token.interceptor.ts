import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem("token")) {
    const reqWithHeader = req.clone({
      headers: req.headers.set(
        'Autorization',
        `Bearer ${localStorage.getItem("token")}` 
      ),
    });
    return next(reqWithHeader);
  }
  else {
    return next(req);
  }
    
  
  
};
