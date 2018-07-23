import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class MainService {

  apiUrl = "http://api.finuans.com/api/";
  requestconfigs = {
    "async": true,
    "dataType": "application/json",
    "crossDomain": true,
    "headers": new HttpHeaders({
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) { }

  reqGet(url): Observable<any> {
    return this.http.get(this.apiUrl + url, this.requestconfigs);
  }
  reqPost(url, reqData): Observable<any> {
    return this.http.post(this.apiUrl + url, reqData, this.requestconfigs);
  }
}
