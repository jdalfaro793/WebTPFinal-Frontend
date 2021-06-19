import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  urlBase:string= "http://localhost:3000/api/plan";
  constructor(
    private _http: HttpClient
  ) { }

  getPlans():Observable<any>{
    let options = {
      header: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.urlBase,options);
  }

  getPlanByID(id: string): Observable<any> {
    let options = {
      header: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.urlBase + '/' + id,options);
  }
}
