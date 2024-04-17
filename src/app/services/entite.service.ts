import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entite} from "../types/entite";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  constructor(private httpClient: HttpClient) { }
  create(entite: Entite): Observable<Entite> {
    return this.httpClient.post<Entite>('/api/entites', entite);
  }

  get(id: string): Observable<Entite> {
    return this.httpClient.get<Entite>('/api/entites/'+id);
  }

  getAll(): Observable<Entite[]> {
    return this.httpClient.get<Entite[]>('/api/entites/');
  }

  update(id: string, entite: Entite): Observable<Entite> {
    return this.httpClient.put<Entite>('/api/entites/'+id, entite);
  }
  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>('/api/entites/'+id)
  }
}
