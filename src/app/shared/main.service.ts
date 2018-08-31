import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';
import { environment } from "../../environments/environment.prod";
import "rxjs/Rx";
import { RouterModule } from '@angular/router';

@Injectable()
export class MainService {
  token = localStorage.getItem("token");

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;
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

  //FUTURE DEVELOPMENT
  // selectboxes = {
  //   "carihesap": this.reqGet.call("CariHesap/List"),
  //   "doviz": this.reqGet.call("Doviz/Get"),
  //   "stokhizmet": this.reqGet.call("StokHizmet/Get")
  // }

  // selectboxHandler() {
  //   let _self = this["component"];
  //   let _selectboxes = this["selectboxes"];
  //   Object.keys(_selectboxes).forEach(item => {
  //     _self["main"].selectboxes[item]();
  //   })
  // }

  notifier(text, type) {
    let notifySettings = {
      message: '',
      closeOnClick: true
    };
    notifySettings.message = text;
    let notifyType = type ? "success" : "error";
    notify(notifySettings, notifyType, 3000);
  }

  handleError(error: Response) {
    debugger;
    let errorMessage = "Sistem hatası";
    if (error.status == 401) {
      errorMessage = "Üzgünüz! Yetkilendirme bulunamadı.";
      localStorage.clear();
      window.location.reload();

    } else {
      try {
        if (error["error"] && error["error"]["ExceptionMessage"]) {
          errorMessage = error["error"]["ExceptionMessage"];
        } else {
          errorMessage = error["message"];
        }
      } catch (ex) {
        errorMessage = "Sistemle iletişim kurulamıyor. Bağlantınızı kontrol edin lütfen.";
      }
    }
    // this.notifySettings.message = errorMessage;
    // notify(this.notifySettings, "error", 4000);
    return Observable.throw(error["error"] || "Server error");
  }

  reqGet(url): Observable<any> {
    return this.http.get(this.apiUrl + url, this.reqConfs)
      .catch(this.handleError);
  }

  reqPost(url, reqData): Observable<any> {
    return this.http.post(this.apiUrl + url, reqData, this.reqConfs)
      .catch(this.handleError);
  }
}
