import { Injectable, inject } from '@angular/core';
import { Recipe } from './recipe';
import { AuthService } from '../app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  authService: AuthService = inject(AuthService);

  constructor() {
  }

  async getRecipes(): Promise<Recipe[]> {
    const response = await fetch("/api/recipes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }
    });
    return (await response.json()) ?? [];
  }

  async getRecipe(id: string | null): Promise<Recipe> {
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }
    });

    return (await response.json()) ?? {
      id: 0,
      name: "",
      ingredients: "",
      directions: ""
    };
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const response = await fetch("/api/recipes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(recipe)
    });
    return (await response.json());
  }

  async updateRecipe(recipe: Recipe): Promise<Boolean> {
    const response = await fetch(`/api/recipes/${recipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(recipe)
    });
    return (response.status == 204);
  }



}
