import { Component, OnInit, } from '@angular/core';
import { MainService } from '../shared/main.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private main: MainService, private router: Router) { }

  login(username,password) {
    this.main.reqGet('login/GetTokenAsync?userName=' + username + '&password=' + password).subscribe(x => {
      localStorage.setItem("token", x);
      this.router.navigate(['/']);
    })
  }

  ngOnInit() {
  }
}
