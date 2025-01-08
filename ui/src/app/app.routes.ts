import { inject } from '@angular/core';
import { Routes, Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeView } from '../recipes/recipe-view.component';
import { RecipeForm } from '../recipes/recipe-form.component';
import { RecipeListComponent } from '../recipes/recipes-list.component';
import { AuthService } from './auth.service';
import { SigninForm } from './sign-in.component';
// import { SignupForm } from './sign-up.component';

let isLoggedIn: boolean = false;

const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  // your  logic goes here
  const router = inject(Router);
  const authService = inject(AuthService);
  if ( authService.isLoggedIn ) {
    return true;
  }
  router.navigate(['/login']);
  return false;
}

export const routes: Routes = [
  { path: 'login', component: SigninForm },
  { path: 'recipes/edit/:id', component: RecipeForm, canActivate: [authGuard] },
  { path: 'recipes/new', component: RecipeForm, canActivate: [authGuard] },
  { path: 'recipes/:id', component: RecipeView, canActivate: [authGuard] },
  { path: '', component: RecipeListComponent, canActivate: [authGuard] }
];
