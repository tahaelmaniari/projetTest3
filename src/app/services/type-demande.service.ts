import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TypeDemande} from "../types/typeDemande";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TypeDemandeService {

  constructor(private httpClient: HttpClient) { }
  create(typeDemande: TypeDemande): Observable<TypeDemande> {
    return this.httpClient.post<TypeDemande>(environment.baseUrl+'/types-demandes', typeDemande);
  }

  get(id: string): Observable<TypeDemande> {
    return this.httpClient.get<TypeDemande>(environment.baseUrl+'/types-demandes'+id);
  }

  getAll(): Observable<TypeDemande[]> {
    return this.httpClient.get<TypeDemande[]>(environment.baseUrl+'/types-demandes');
  }

  update(id: string, typeDemande: TypeDemande): Observable<TypeDemande> {
    return this.httpClient.put<TypeDemande>(environment.baseUrl+'/types-demandes/'+id, typeDemande);
  }
  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.baseUrl+'/types-demandes/'+id)
  }
}
