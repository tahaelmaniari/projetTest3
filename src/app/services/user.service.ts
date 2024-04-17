import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../types/user";
import {BehaviorSubject, catchError, filter, map, Observable, of, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {userProfile} from "../types/profile";
import {AuthService} from "./auth.service";
import {RoleApplicatif} from "../types/role-applicatif";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authenticatedUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({
    authorities: [],
    email: "",
    enabled: false,
    fonction:'',
    firstName: "",
    id: "",
    lastName: "",
    matricule: "",
    provenance: ""
  });
  private authenticatedUserObservable: Observable<User> = this.authenticatedUserSubject
    .asObservable()
    .pipe(filter((u) => u != null && u.email != null));

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }
  create(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.baseUrl+'/users', user);
  }

  get(id: string): Observable<User> {
    return this.httpClient.get<User>(environment.baseUrl+'/users/'+id);
  }

  getValidators(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.baseUrl+'/users/'+id+'/validators');
  }

  search(user: any|null, params?: any): Observable<any> {
    return this.httpClient.post<User[]>(environment.baseUrl+'/users/search', user, {params});
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.baseUrl+'/users');
  }
   getUser(): Observable<User>{
     return this.httpClient.get<User>(environment.baseUrl+'/users/username/'+this.authService.getLoggedUser()?.['email'])
   }

   getAllRoles():Observable<RoleApplicatif[]>{
    return this.httpClient.get<RoleApplicatif[]>(environment.baseUrl+'/users/roles')

   }

  update(id: string | undefined, user: User): Observable<User> {
    return this.httpClient.put<User>(environment.baseUrl+'/users/'+id, user);
  }

  getByUsername(username: string): Observable<User>{
    return this.httpClient.get<User>(environment.baseUrl+'/users/username/'+username).pipe(
      map((user: User)=>{
        userProfile.provenance=user.provenance;
        userProfile.entite=user.entite;
        userProfile.delegationRegionale=user.delegationRegionale;
        userProfile.firstName=user.firstName;
        userProfile.lastName=user.lastName;
        userProfile.userId=user.id;
        userProfile.email=user.email;
        userProfile.roles=user.authorities;
        userProfile.matricule=user.matricule;
        window.sessionStorage.setItem(
          "USER_PROFILE",
          JSON.stringify(userProfile)
        );
        return user;
      }), catchError((err)=>{
        let user: User={
          authorities: ["none"], id: "",
          firstName: "none",
          lastName: "none",
          fonction:'none',
          matricule: "none",
          email: "none",
          provenance: "none",
          enabled: false
        }
        sessionStorage.setItem("USER_PROFILE", JSON.stringify(user))
        return of(user);

      }),
      // tap((user) => this.authenticatedUserSubject.next(user))
    );
  }

  getAuthenticatedUser(): Observable<User> {
    return this.authenticatedUserObservable;
  }

  getUserProfile(): any {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem('USER_PROFILE'));
  }

  getCurrentUser(): User {
    const profile=this.getUserProfile();
    return {
      authorities: [],
      email: profile.email,
      enabled: false,
      fonction:profile.fonction,
      firstName: profile.firstName,
      lastName: profile.lastName,
      matricule: profile.matricule,
      provenance: profile.provenance,
      id: profile.userId
    }
  }

}

