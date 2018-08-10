import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) { }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return true
        } else{
            return false
        };
    }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}