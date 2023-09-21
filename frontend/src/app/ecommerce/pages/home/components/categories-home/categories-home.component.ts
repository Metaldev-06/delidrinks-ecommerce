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
      url: 'with-alcohol',
      image: '../../../../../../assets/images/category-bebidas-alcohol.png',
    },
    {
      name: 'Bebidas sin Alcohol',
      url: 'without-alcohol',
      image: '../../../../../../assets/images/category-bebidas.png',
    },
    {
      name: 'Combos',
      url: 'combos',
      image: '../../../../../../assets/images/category-combos.png',
    },
  ];
}

// this.router.navigate([`/products`], {
//   queryParams: {
//     category: event.node.parent.data,
//     subcategory: event.node.data,
//   },
// })
