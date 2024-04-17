import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {FormTemplate} from "../types/form-template";
import {ApplicationFormNameAndIdDTO} from "../types/application-form-name-id";
import {Application} from "../types/application";

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private httpClient: HttpClient) {
  }


  saveTemplate(requetBody: FormTemplate[]): Observable<FormTemplate[]> {
    return this.httpClient.post<FormTemplate[]>(environment.baseUrl + '/forms/api/v1/template', requetBody);
  }

  updateTemplateOnDb(requetBody: FormTemplate[]): Observable<FormTemplate[]> {
    return this.httpClient.put<FormTemplate[]>(environment.baseUrl + '/forms/api/v1/template', requetBody);
  }
  checkTemplateNameExist(templateNM:string): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.baseUrl + '/forms/api/v1/template/'+templateNM);
  }
  deleteTemplate(templateId:string):Observable<HttpResponse<any>>{
    return this.httpClient.delete<HttpResponse<any>>(environment.baseUrl + '/forms/api/v1/template/'+templateId);
  }

  getTemplateById(templateId:string): Observable<FormTemplate[]> {
    return this.httpClient.get<FormTemplate[]>(environment.baseUrl + '/forms/api/v1/template/'+templateId);
  }


  getAlltemplateNames(): Observable<ApplicationFormNameAndIdDTO[]> {
    return this.httpClient.get<ApplicationFormNameAndIdDTO[]>(environment.baseUrl + '/forms/api/v1/template/names');
  }

  getTemplateByAppIdandTypeDemandeId(applicationId: string, templateId: string | undefined):Observable<FormTemplate[]>{
    return this.httpClient.get<FormTemplate[]>(environment.baseUrl+ `/forms/api/v1//template/${applicationId}/${templateId}`)
  }

  updateField(filedId:string,requestBody:FormTemplate):Observable<FormTemplate>{
    return this.httpClient.put<FormTemplate>(environment.baseUrl + '/forms/api/v1//template/filed/'+filedId ,requestBody)

  }
  deleteFieldFromDb(id_aft:string):Observable<HttpResponse<any>>{
    return this.httpClient.delete<HttpResponse<any>>(environment.baseUrl + '/forms/api/v1//template/filed/'+id_aft)

  }

  checkIfFeildExist(id_aft :string):Observable<Boolean>{
    return this.httpClient.get<Boolean>(environment.baseUrl + '/forms/api/v1/template/filed/'+id_aft)

  }
  listTdAssociatedWithAppId(appId :string ,typeId:string ):Observable<HttpEvent<any>>{

    return this.httpClient.get<HttpEvent<any>>(environment.baseUrl + '/forms/api/v1/template/typeDemande/'+appId+'/'+typeId)

  }

}
