import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Application} from "../types/application";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {FormTemplate} from "../types/form-template";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient: HttpClient) { }
  create(application: Application): Observable<Application> {
    return this.httpClient.post<Application>(environment.baseUrl+'/applications', application);
  }

  get(id: string ): Observable<Application> {
    return this.httpClient.get<Application>(environment.baseUrl+'/applications/'+id);
  }

  getAll(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(environment.baseUrl+'/applications');
  }

  search(params: any, application: Application): Observable<any> {
    return this.httpClient.post<Application[]>(environment.baseUrl+'/applications/search', application, {params});
  }

  update(id: string, application: Application): Observable<Application> {
    return this.httpClient.put<Application>(environment.baseUrl+'/applications/'+id, application);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.baseUrl+'/applications/'+id)
  }

  saveTemplate(requetBody: FormTemplate[]): Observable<FormTemplate[]> {
    return this.httpClient.post<FormTemplate[]>(environment.baseUrl + 'forms/api/v1/template', requetBody);
  }
}
