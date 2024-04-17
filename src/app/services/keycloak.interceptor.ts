import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class KeycloakInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.authService.isLoggedIn()) {
      return next.handle(req);
    }
    const modifiedReq = req.clone(
      {
        setHeaders: {
          "X-USER": this.authService.getLoggedUser()?.['email'],
          Authorization: 'Bearer '+this.authService.getToken()
        },
      },
    );
    return next.handle(modifiedReq);
  }
  getUserToken() {
    // const tokenPromise: Promise<string> = this.keycloakService.getToken();
    // const tokenObservable: Observable<string> = from(tokenPromise);
    // return tokenObservable;
  }
}
