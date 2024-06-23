import {Component} from '@angular/core';
import {SlicePipe} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Recipe} from './recipe';


@Component({
  selector: 'recipe-list',
  imports: [RouterLink, RouterLinkActive, SlicePipe],
  template: `
    <h2>Recipes</h2>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      @for ( recipe of recipes; track recipe.id ) {
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{recipe.name}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Ingredients</h6>
            <p class="card-text">{{ (recipe.ingredients.length>100)? (recipe.ingredients | slice:0:100)+'...':(recipe.ingredients)}}</p>
            <h6 class="card-subtitle mb-2 text-muted">Directions</h6>
            <p class="card-text">{{ (recipe.directions.length>100)? (recipe.directions | slice:0:100)+'...':(recipe.directions)}}</p>
            <a href="#" class="stretched-link" routerLink="/recipes/{{recipe.id}}" routerLinkActive="active" ariaCurrentWhenActive="page"></a>
          </div>
        </div>
      </div>
      }
    </div>

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
