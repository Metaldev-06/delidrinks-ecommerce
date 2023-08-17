import { Component, Input, OnInit, signal } from '@angular/core';
import { RecipeDatum } from 'src/app/core/interfaces/recipe.interfaces';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: RecipeDatum;

  image = signal<string>('');
  category = signal<string>('');

  ngOnInit(): void {
    this.getRelations(this.recipe);
  }

  getRelations(recipe: RecipeDatum) {
    this.image.set(
      `${recipe.attributes.image.data.attributes.formats.small.url}`
    );
    this.category.set(
      `${recipe.attributes.categories.data[0].attributes.name}`
    );
  }
}
