import {Component} from '@angular/core';
import {Recipe} from './recipe';


@Component({
  selector: 'recipe-list',
  template: `
    <h2>Recipes</h2>
    <ul>
    @for ( recipe of recipes; track $index ) {
        <li>{{ recipe.name }}</li>
    }
    </ul>
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