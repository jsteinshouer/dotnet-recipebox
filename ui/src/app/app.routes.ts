import { Routes } from '@angular/router';
import { RecipeView } from '../recipes/recipe-view.component';
import { RecipeListComponent } from '../recipes/recipes-list.component';

export const routes: Routes = [
    { path: 'recipes/:id', component: RecipeView },
    { path: '', component: RecipeListComponent }
];
