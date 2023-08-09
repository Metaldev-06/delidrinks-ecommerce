import { Component } from '@angular/core';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss'],
})
export class CategoriesHomeComponent {
  categories = [
    {
      name: 'Bebidas con Alcohol',
      url: '',
      image: '../../../../../../assets/images/category-bebidas-alcohol.png',
    },
    {
      name: 'Bebidas sin Alcohol',
      url: '',
      image: '../../../../../../assets/images/category-bebidas.png',
    },
    {
      name: 'Combos',
      url: '',
      image: '../../../../../../assets/images/category-combos.png',
    },
  ];
}
