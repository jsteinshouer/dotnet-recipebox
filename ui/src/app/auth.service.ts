import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
      return true;
    }

    return false;
    // console.log(response);
  }

  async register(email: string, password: string) {
    const response = await fetch("/api/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    });

    if ( response.ok ) {
      return true;
    }
    return false;

  }

}
