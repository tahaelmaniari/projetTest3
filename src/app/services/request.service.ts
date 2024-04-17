import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Request} from "../types/request";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Attachment} from "../types/attachment";
import {GlobaleRequestObject} from "../types/globaleRequestObject";
import {PanierApplication} from "../types/panierApplication";
import {BasketItem} from "../types/BasketItem";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }
  download(filename: string | undefined): Observable<any>{
    return this.httpClient.get("/requests/files/"+filename);
  }

/*  create(request: Request): Observable<Request> {
    console.log('request dto from service')
    console.log(request)
    return this.httpClient.post<Request>(environment.baseUrl+'/requests/create',request);
  }*/
  create(globaleRequestObject: GlobaleRequestObject): Observable<GlobaleRequestObject> {
    console.log('request dto from service')
    console.log(globaleRequestObject)
    return this.httpClient.post<GlobaleRequestObject>(environment.baseUrl+'/requests/create',globaleRequestObject);
  }

/*  private buildFormDataRequest(files: any[], request: Request) {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    })
    formData.append('request', JSON.stringify(request))
    return formData;
  }*/

  submit(request: Request): Observable<Request> {
    return this.httpClient.post<Request>(environment.baseUrl+'/requests/submit-task', request);
  }

  complete(request: Request): Observable<Request> {

    return this.httpClient.post<Request>(environment.baseUrl+'/requests/complete-task',request);
  }


  lock(request: Request): Observable<Request> {
    return this.httpClient.post<Request>(environment.baseUrl+'/requests/'+request.id+'/assignee', request);
  }

  assign(request: Request): Observable<Request> {
    return this.httpClient.post<Request>(environment.baseUrl+'/requests/'+request.id+'/assignee/'+request.assignee.id, request);
  }

  get(id: string): Observable<Request> {
    return this.httpClient.get<Request>(environment.baseUrl+'/requests/'+id);
  }

  getAll(application: string, type: string, dateInitiale: string, dateFinale: string, status: string, assigneeId: string, initiatorId: string){
    let params= new HttpParams();
    if(assigneeId!=""){
    params=params.set("assigneeId", assigneeId);
    }
    if (status!=""){
      params=params.set("status", status)
    }
    if (initiatorId!=""){
      params=params.set("initiatorId", initiatorId)
    }
    if (application!=""){
      params=params.set("application", application)
    }
    if (type!=""){
      params=params.set("type", type)
    }
    if (dateInitiale!=""){
      params=params.set("dateInitiale", dateInitiale)
    }
    if (dateFinale!=""){
      params=params.set("dateFinale", dateFinale)
    }
    return this.httpClient.get<Request[]>(environment.baseUrl+'/requests/search', {params: params});
  }

  search(request: any, params: any): Observable<any>{
    return this.httpClient.post<Request[]>(environment.baseUrl+'/requests/search', request, {params});
  }

  getPilotageData(request: any): Observable<Request[]>{
    return this.httpClient.post<Request[]>(environment.baseUrl+'/requests/pilotage', request);
  }

  getPanier(id:string):Observable<PanierApplication>{
    return this.httpClient.get<PanierApplication>(environment.baseUrl+'/requests/panier/'+id)
  }

  deleteBasketItem(id :string):Observable<BasketItem>{
    return this.httpClient.delete<BasketItem>(environment.baseUrl + '/requests/basket/' + id);
  }

  update(id: string | undefined, request: Request, file: any): Observable<Request> {
    const formData=new FormData();
    formData.append("file", file)
    formData.append("request", JSON.stringify(request))
    return this.httpClient.put<Request>(environment.baseUrl+'/requests/'+id, formData);
  }

  updateBi(id: string, basketItemObject: BasketItem):Observable<BasketItem> {
    return this.httpClient.put<BasketItem>(environment.baseUrl+'/requests/basket/'+id, basketItemObject)
  }
}
