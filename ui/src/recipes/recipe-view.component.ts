import {Component} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {Recipe} from './recipe';


@Component({
  selector: 'recipe-view',
  imports: [RouterLink],
  template: `
  <div class="container" style="margin-top: 30px">
    <h1>{{recipe.name}}</h1>
    <div>
      <h5><strong>Ingredients</strong></h5>
      <pre>{{recipe.ingredients}}</pre>
    </div>
    <div>
      <h5><strong>Directions</strong></h5>
      <pre>{{recipe.directions}}</pre>
    </div>
    <a routerLink="/recipes/edit/{{recipe.id}}" class="btn btn-light btn-lg" href="#">Edit</a>
  </div>
  `,
  styles: `
  pre {
      display: block;
      padding: 10px;
      margin: 0 0 10.5px;
      font-size: 14px;
      line-height: 1.428571429;
      color: #333;
      word-break: break-all;
      word-wrap: break-word;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      border-radius: 0;
    }
  `,
  standalone: true,
})
export class RecipeView {
  recipe: Recipe = {
    id: 0,
    name: "",
    ingredients: "",
    directions: ""
  };

  constructor(private route: ActivatedRoute) {
    this.getRecipe( route.snapshot.paramMap.get('id') ).then((recipe: Recipe) => {
        this.recipe = recipe;
      });
    }

    async getRecipe( id: string | null): Promise<Recipe> {
      const response = await fetch(`/api/recipes/${id}`);
      return (await response.json()) ?? {
        id: 0,
        name: "",
        ingredients: "",
        directions: ""
      };
    }

}
