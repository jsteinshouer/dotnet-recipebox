import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeListComponent } from '../recipes/recipes-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RecipeListComponent],
  template: `
    <h1>Welcome to {{title}}!</h1>
    <recipe-list />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'ui';
}
