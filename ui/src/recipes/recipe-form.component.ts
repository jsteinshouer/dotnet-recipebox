import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import {Recipe} from './recipe';


@Component({
  imports: [FormsModule],
  selector: 'recipe-view',
  template: `
<div class="container" style="margin-top: 30px">
  <form role="form">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control input-lg" name="name" required [(ngModel)]="recipe.name" />
    </div>
    <div class="form-group">
      <label for="ingredients">Ingredients</label>
      <textarea name="ingredients" class="form-control" rows="7" [(ngModel)]="recipe.ingredients"></textarea>
    </div>
    <div class="form-group">
      <label for="directions">Directions</label>
      <textarea name="directions" class="form-control" rows="7" [(ngModel)]="recipe.directions"></textarea>
    </div>
    <div class="mt-3">
     <button type="submit" class="btn btn-light btn-lg">Save</button>
    </div>

    <!--  <span class="text-success" style="margin-left: 5px"><strong>Saved!</strong> The recipe was saved successfully.</span>
    <span class="text-danger" style="margin-left: 5px" ng-show="saveError"><strong>Error!</strong> </div> -->
  </form>
  </div>
  `,
  standalone: true,
})
export class RecipeForm {
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
