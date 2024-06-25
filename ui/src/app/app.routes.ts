import { Routes } from '@angular/router';
import { RecipeView } from '../recipes/recipe-view.component';
import { RecipeForm } from '../recipes/recipe-form.component';
import { RecipeListComponent } from '../recipes/recipes-list.component';

export const routes: Routes = [
    { path: 'recipes/edit/:id', component: RecipeForm },
    { path: 'recipes/new', component: RecipeForm },
    { path: 'recipes/:id', component: RecipeView },
    { path: '', component: RecipeListComponent }
];
