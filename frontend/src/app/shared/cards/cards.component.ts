import { Component, Input, signal, OnInit } from '@angular/core';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() product!: ProductDatum;

  isFlashing: boolean = false;

  private readonly baseUrl = environment.imageUrl;
  image = signal<string>('');
  brand = signal<string>('');
  category = signal<string>('');

  ngOnInit(): void {
    this.getRelations(this.product);
  }

  getRelations(products: ProductDatum) {
    this.image.set(
      `${this.baseUrl}${products.attributes.image.data[0].attributes.url}`
    );

    this.brand.set(`${products.attributes.brand.data.attributes.name}`);

    this.category.set(`${products.attributes.category.data.attributes.name}`);
  }

  getDynamicStyles(): any {
    return {
      background: `radial-gradient(circle at 50% 50%, ${this.product.attributes.color} -30%, rgba(0, 0, 0, 0) 55%)`,
      transition: 'background-color 0.5s ease-in-out', // Animación de transición
      display: this.isFlashing ? 'block' : 'none',
    };
  }

  startFlash() {
    this.isFlashing = true; // Activa la animación cuando entra el mouse
  }

  stopFlash() {
    this.isFlashing = false; // Desactiva la animación cuando sale el mouse
  }
}
