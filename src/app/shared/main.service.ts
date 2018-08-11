import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';

@Injectable()
export class MainService {
  token = localStorage.getItem("token");

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:54282/api/";
  reqConfs = {
    "async": true,
    "dataType": "application/json",
    "crossDomain": true,
    "headers": new HttpHeaders({
      "Authorization": "Basic " + this.token,
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    })
  };
  
  getList (_self = this, uri) {
    _self["main"].reqGet(uri).subscribe(res => {
      _self["dataSource"] = res;
      _self["state"] = 0;
    });
  };

  handleItem(_self = this, uri1, uri2, e) {
    _self["main"].reqGet(uri1 + e.data.ID).subscribe(res => {
      _self["selectedItem"] = res;
      _self["state"] = 2;
    });
    _self["main"].reqGet(uri2 + e.data.ID).subscribe(resIslem => {
      _self["info"] = resIslem;
    });
  }

  handleAction(paramater) {
    let _self = this;
    _self["dataSource2"] = [];
    _self["selectedItem"] = new Object();
    _self["selectedItem"].ID = 0;
    _self["state"] = paramater;
  }

  notifier(text, type){
    let notifyType = type ? "success" : "error";
    notify(text, notifyType, 3000);
  }

  reqGet(url): Observable<any> {
    return this.http.get(this.apiUrl + url, this.reqConfs);
  }

  reqPost(url, reqData): Observable<any> {
    return this.http.post(this.apiUrl + url, reqData, this.reqConfs);
  }
}
