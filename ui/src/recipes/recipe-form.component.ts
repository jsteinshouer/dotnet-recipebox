import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import {Recipe} from './recipe';

//TODO: Learn the Angular way of form validation - https://angular.dev/guide/forms/template-driven-forms
@Component({
  imports: [FormsModule, NgIf],
  selector: 'recipe-view',
  template: `
<div class="container" style="margin-top: 30px">
  <form>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control input-lg" name="name" required [(ngModel)]="recipe.name" />
    </div>
    <div class="form-group">
      <label for="ingredients">Ingredients</label>
      <textarea name="ingredients" class="form-control" rows="7" [(ngModel)]="recipe.ingredients" required></textarea>
    </div>
    <div class="form-group">
      <label for="directions">Directions</label>
      <textarea name="directions" class="form-control" rows="7" [(ngModel)]="recipe.directions" required></textarea>
    </div>
    <div *ngIf="validationFailed" class="text-danger">All fields are required!</div>
    <div class="mt-3">
     <button type="submit" class="btn btn-light btn-lg" (click)="onSave()" [disabled]="submitted">
      <span class="spinner-border spinner-border-sm" aria-hidden="true" *ngIf="submitted"></span>
      Save
    </button>
    </div>

  </form>
  </div>
  `,
  standalone: true,
})
export class RecipeForm {

  submitted = false;
  validationFailed = false;
  recipe: Recipe = {
    id: 0,
    name: "",
    ingredients: "",
    directions: ""
  };

  constructor(private route: ActivatedRoute) {

    if (route.snapshot.paramMap.get('id') ) {
      this.getRecipe( route.snapshot.paramMap.get('id') ).then((recipe: Recipe) => {
        this.recipe = recipe;
      });
    }
  }

  onSave() {
    this.submitted = true;
    this.validationFailed = false;
    if (this.recipe.name == "" || this.recipe.directions == "" || this.recipe.ingredients == "" ){
      this.validationFailed = true;
      this.submitted = false;
      return;
    }

    if ( this.recipe.id == 0 ) {
      this.createRecipe(this.recipe).then((recipe: Recipe) => {
        this.recipe = recipe;
        this.submitted = false;
      });
    }
    else {
      this.updateRecipe(this.recipe).then((success: Boolean) => {
        if (success) {
          this.submitted = false;
        }
        else {
          alert("Update failed!")
        }
      });
    }

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

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const response = await fetch("/api/recipes", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( recipe )
    });
    return (await response.json());
  }

  async updateRecipe(recipe: Recipe): Promise<Boolean> {
    const response = await fetch(`/api/recipes/${recipe.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( recipe )
    });
    return (response.status == 204);
  }

}
