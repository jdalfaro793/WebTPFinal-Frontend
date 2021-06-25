import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/models/plan/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  urlBase:string= "http://localhost:3000/api/plan/";
  constructor(
    private _http: HttpClient
  ) { }

  getPlans():Observable<any>{
    let options = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.urlBase,options);
  }

  get(nombreFilter: string, diasFilter: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({}),
      params: {
        nombre : nombreFilter,
        dias : diasFilter
      }
    }
    return this._http.get(this.urlBase, options);
  }

  getPlanByID(id: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.urlBase + '/' + id,options);
  }

  add(plan: Plan): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json" 
      }),
      params: new HttpParams({})
    }
    const body = JSON.stringify(plan);
    return this._http.post(this.urlBase, body, options);
  }

  put(plan: Plan): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json" 
      }),
      params: new HttpParams({})
    }
    const body = JSON.stringify(plan);
    return this._http.put(this.urlBase + plan._id, body, options);
  }
}
