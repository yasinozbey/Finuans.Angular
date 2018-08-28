import { Component, OnInit, } from '@angular/core';
import { MainService } from '../shared/main.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggining = false;
  accessGranted = false;
 
  constructor(private main: MainService, private router: Router) { }

  login(username,password) {
    this.isLoggining = true;
    this.accessGranted = false;
    if(!username && !password){
      username = "demo";
      password = "demo";
    }
    this.main.reqGet('login/GetTokenAsync?userName=' + username + '&password=' + password).subscribe(x => {
      localStorage.setItem("token", x);
      this.isLoggining = false;
      this.accessGranted = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 600);
    }, err => {
      this.isLoggining = false;
      this.main.notifier('Giriş başarısız!', false)
    })
  }

  onKeydown(event, username, password) {
    if (event.key === "Enter") {
      this.login(username,password)
    }
  }

  ngOnInit() {
  }
}
