import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';

@Injectable()
export class MainService {
  token = localStorage.getItem("token");

  constructor(private http: HttpClient) { }

  apiUrl = "http://api.finuans.com/api/";
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

  selectboxes = {
    CariHesap: { url: "CariHesap/List", item: "cariHesapListesi", cache: [], cachetime: 6000 },
    Doviz: { url: "Doviz/Get", item: "dovizListesi" },
    StokHizmet: { url: "StokHizmet/Get", item: "StokHizmetListesi" },
  }

  getList(_self, url) {
    this.http.get(_self["main"].apiUrl + url, _self["main"].reqConfs).subscribe(res => {
      _self["dataSource"] = res;
      _self["state"] = 0;
    },
      err => {
        debugger;
      });
  };

  selectBoxes(_self, selectboxes) {
    let containedResponses = 0;
    let allDone = false;
    selectboxes && selectboxes.forEach(element => {
      _self["main"].reqGet(_self["main"].selectboxes.element.url).subscribe(res => {
        _self[selectboxes.element.item] = res;
        _self[selectboxes.element.cache] = res;
        setTimeout(() => {
          _self[selectboxes.element.cache] = [];
        }, _self[selectboxes.element.cachetime]);
        if (containedResponses == selectboxes.length) {
          return true;
        } else {
          containedResponses++
        }
      }, err => {
        _self["main"].notifier("Ne yazık ki ")
      });
    });
  }

  handleItem(_self, uri1, uri2, e) {
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

  notifier(text, type) {
    let notifySettings = {
      message: '',
      closeOnClick: true
    };
    notifySettings.message = text;
    let notifyType = type ? "success" : "error";
    notify(notifySettings, notifyType, 3000);
  }

  reqGet(url): Observable<any> {
    return this.http.get(this.apiUrl + url, this.reqConfs);
  }

  reqPost(url, reqData): Observable<any> {
    return this.http.post(this.apiUrl + url, reqData, this.reqConfs);
  }
}
