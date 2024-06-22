import {Component} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Recipe} from './recipe';


@Component({
  selector: 'recipe-list',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <h2>Recipes</h2>
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Ingredients</th>
        <th scope="col">Directions</th>
      </tr>
    </thead>
    <tbody>
    @for ( recipe of recipes; track recipe.id ) {
      <tr>
        <td><a routerLink="/recipes/{{recipe.id}}" routerLinkActive="active" ariaCurrentWhenActive="page">{{ recipe.name }}</a></td>
        <td class="text-truncate" style="max-width: 200px;">{{ recipe.ingredients }}</td>
        <td class="text-truncate" style="max-width: 200px;">{{ recipe.directions }}</td>
    }
    </tbody>
    </table>
  `,
  standalone: true,
})
export class RecipeListComponent {
  recipes: Recipe[] = [];

    constructor() {
      this.getRecipes().then((recipeData: Recipe[]) => {
        this.recipes = recipeData;
      });
    }

    async getRecipes(): Promise<Recipe[]> {
        const response = await fetch("/api/recipes");
        return (await response.json()) ?? [];
    }

}
