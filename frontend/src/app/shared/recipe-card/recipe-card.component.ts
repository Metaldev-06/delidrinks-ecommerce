import { Component, Input, OnInit, signal } from '@angular/core';
import { RecipeDatum } from 'src/app/core/interfaces/recipe.interfaces';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: RecipeDatum;

  private readonly baseUrl = environment.imageUrl;

  image = signal<string>('');
  category = signal<string>('');

  ngOnInit(): void {
    this.getRelations(this.recipe);
  }

  getRelations(recipe: RecipeDatum) {
    this.image.set(
      `${this.baseUrl}${recipe.attributes.image.data.attributes.url}`
    );
    this.category.set(
      `${recipe.attributes.categories.data[0].attributes.name}`
    );
  }
}
