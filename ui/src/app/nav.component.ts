import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';
import { NgIf } from '@angular/common'

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" routerLink="/" >RecipeBox</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor02" *ngIf="authService.isLoggedIn">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" routerLink="/" routerLinkActive="active">Recipes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" routerLink="/recipes/new" routerLinkActive="active">New</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-sm-2" type="search" placeholder="Search">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
    <div class="collapse navbar-collapse justify-content-end"  id="navbarColor02" *ngIf="!authService.isLoggedIn">
      <ul class="navbar-nav nav">
        <li class="nav-item">
          <a class="nav-link active" routerLink="/login" routerLinkActive="active">Login</a>
        </li>
        <li class="nav-item">
          <!-- <a class="nav-link active" routerLink="/signup" routerLinkActive="active">Sign-up</a> -->
        </li>
      </ul>
    </div>
  </div>
</nav>
  `,
  styles: [],
})
export class NavComponent {
  authService = inject(AuthService);
}
