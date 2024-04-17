import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakTokenParsed} from "keycloak-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) {

  }

  getLoggedUser(): KeycloakTokenParsed | undefined{
    try {
      return this.keycloakService.getKeycloakInstance().idTokenParsed;
    } catch (e) {
      return undefined
    }
  }

  isLoggedIn(){
    return this.keycloakService.isLoggedIn();
  }

  getToken(){
    return this.keycloakService.getKeycloakInstance().token;
  }

  loadUserProfile() {
    return this.keycloakService.loadUserProfile();
  }

  login(){
    this.keycloakService.login();
  }

  logout(){
    this.keycloakService.logout();
  }

  redirectToProfile(){
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  refreshToken(){
    this.keycloakService.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnTokenExpired) {
          this.keycloakService.updateToken(20);
        }
      }
    });
  }

}
