import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: Router = inject(Router);
  isLoggedIn: boolean = false;
  token: string = "";
  refreshToken = "";

  constructor() {
  }

  async login(email: string, password: string) {
    const response = await fetch("/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    });

    if ( response.ok ) {
      const responseData = await response.json();
      this.isLoggedIn = true;
      this.token = responseData.accessToken;
      this.refreshToken = responseData.refreshToken;
      this.router.navigateByUrl("/");
    }
    // console.log(response);
  }

}
