import {Component} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Recipe} from './recipe';


@Component({
  selector: 'recipe-view',
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
    <!-- <a class="btn btn-default btn-lg" href="#">Edit</a>-->
  </div>
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
      console.log(this.route)
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
