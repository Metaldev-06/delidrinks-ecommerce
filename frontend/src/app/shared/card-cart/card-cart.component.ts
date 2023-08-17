import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartProduct } from 'src/app/core/interfaces/cart-product.interfaces';
import { ProductDatum } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.scss'],
})
export class CardCartComponent implements OnInit {
  @Input() product!: ProductDatum;
  @Output() deleteProduct = new EventEmitter<string>();
  @Output() updateProduct = new EventEmitter<CartProduct>();
  @Output() validate = new EventEmitter<boolean>();

  selectForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);

  image = signal<string>('');
  brand = signal<string>('');
  category = signal<string>('');
  stock = 0;

  ngOnInit(): void {
    this.getRelations(this.product);
    this.selectForm = this.initSelectForm();
    this.validate.emit(this.selectForm.valid);
    // this.selectForm.valueChanges.subscribe(() => {
    //   this.validate.emit(this.selectForm.valid);
    // });
  }

  getRelations(product: ProductDatum) {
    this.image.set(
      `${product.attributes.image.data[0].attributes.formats.thumbnail.url}`
    );
    this.brand.set(`${product.attributes.brand.data.attributes.name}`);
    this.category.set(`${product.attributes.category.data.attributes.name}`);
    this.stock = product.attributes.stock;
  }

  get stockOptions(): number[] {
    return Array.from({ length: this.stock }, (_, index) => index + 1);
  }

  get total(): number {
    return this.product.attributes.quantity! * this.product.attributes.price;
  }

  deleteCartItem(slug: string) {
    this.deleteProduct.emit(slug);
    this.validate.emit(this.selectForm.valid);
  }

  private initSelectForm(): FormGroup {
    return this.formBuilder.group({
      quantity: [
        this.product.attributes.quantity,
        [Validators.min(1), Validators.max(this.stock)],
      ],
    });
  }

  selectQuantity(slug: string) {
    const body: CartProduct = {
      slug,
      quantity: Number(this.selectForm.value.quantity),
    };
    this.updateProduct.emit(body);
  }
}
