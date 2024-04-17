import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Template} from "../types/template";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Request} from "../types/request";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private httpClient: HttpClient) { }
  create(template: Template, file: any): Observable<Template> {
    const formData=this.buildFormDataRequest(file, template);
    return this.httpClient.post<Template>(environment.baseUrl+'/templates', formData);
  }
  private buildFormDataRequest(file: any, template: Template) {
    const formData: FormData = new FormData();
      formData.append('file', file);
    formData.append('template', JSON.stringify(template))
    return formData;
  }

  get(id: string): Observable<Template> {
    return this.httpClient.get<Template>(environment.baseUrl+'/templates/'+id);
  }

    getByApplicationAndTypeDemande(applicationId: string | undefined, typeDemandeId: string | undefined): Observable<Template[]>{
    return this.httpClient.get<Template[]>(environment.baseUrl+'/templates/filter?applicationId='+applicationId+'&typeDemandeId='+typeDemandeId);
  }

  getAll(): Observable<Template[]> {
    return this.httpClient.get<Template[]>(environment.baseUrl+'/templates');
  }

  getPageable(params: any): Observable<any> {
    return this.httpClient.get<Template[]>(environment.baseUrl+'/templates/search', {params});
  }

    update(id: string | undefined, template: Template, file: any): Observable<Template> {
    const formData=this.buildFormDataRequest(file, template);
    return this.httpClient.put<Template>(environment.baseUrl+'/templates/'+id, template);
  }
  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.baseUrl+'/templates/'+id)
  }
}
