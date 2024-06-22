import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeListComponent } from '../recipes/recipes-list.component';
import { NavComponent } from './nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RecipeListComponent,NavComponent],
  template: `
    <nav-bar />
    <div class="container" style="margin-top: 50px">
      <router-outlet />
    </div>`,
  styles: [],
})
export class AppComponent {
  title = 'ui';
}
