import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from "./user.service";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {take} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    private keycloakService: KeycloakService,
    private userService: UserService,
  ) {
    super(router, keycloakService);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!await this.keycloakService.isLoggedIn()) {
      await this.keycloakService.login({
        redirectUri: window.location.origin + state.url
      });
    }

    const user=await this.userService.getUser().pipe(take(1)).toPromise();
    // Get the roles required from the route.
    const requiredRoles=route.data?route.data['roles'] : '';


    // Allow the user to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }
    if (!requiredRoles.some((role) => user?.authorities?.includes(role))) {
      await this.router.navigate(['/pages/not-found']);
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.some((role) => user?.authorities?.includes(role));
  }
}
