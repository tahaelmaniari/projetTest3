import {environment} from "../../environments/environment";
import {KeycloakOptions, KeycloakService} from 'keycloak-angular';

export function initializer(keycloakAuth: KeycloakService): () => Promise<boolean> {
  const options: KeycloakOptions={
    config: {
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    },
    initOptions:
      { onLoad: 'login-required', checkLoginIframe: false }
  }
  return () => keycloakAuth.init(options);
}
