import { Component,inject } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';


@Component({
  selector: 'recipe-list',
  imports: [RouterLink, RouterLinkActive, SlicePipe],
  template: `
    <h2>Recipes</h2>
    <div class="row row-cols-2 g-4">
        <div class="col">
            <ul class="pagination">
               <li class="page-item"><a class="page-link" href="#" (click)="showAll()" >All</a></li>
              @for ( letter of index; track $index ) {
              <li class="page-item"><a class="page-link" href="#" (click)="filterRecipes( letter )" >{{letter}}</a></li>
              }
            </ul>
      </div>
      <div class="col">
        <span class="float-end">{{filterCount}} of {{recipes.length}}</span>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      @for ( recipe of filteredRecipes; track recipe.id ) {
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
  filteredRecipes: Recipe[] = [];
  index = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  total: number = 0;
  filterCount: number = 0;
  recipeService: RecipeService = inject(RecipeService);

    constructor() {
      this.recipeService.getRecipes().then((recipeData: Recipe[]) => {
        this.recipes = recipeData.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1 );
        this.showAll();
      });
    }

    filterRecipes( letter: string ) {
      this.filteredRecipes = this.recipes.filter( (item) => Array.from( item.name )[0].toUpperCase() == letter );
      this.filterCount = this.filteredRecipes.length;
    }
    showAll() {
      this.filteredRecipes = this.recipes;
      this.filterCount = this.recipes.length;
    }

}
