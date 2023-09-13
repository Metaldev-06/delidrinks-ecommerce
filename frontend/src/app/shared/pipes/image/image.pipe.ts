import { Pipe, PipeTransform } from '@angular/core';
import { ProductDatum } from 'src/app/core/interfaces/product';

@Pipe({
  name: 'ImagePipe',
})
export class ImagePipe implements PipeTransform {
  transform(product: ProductDatum, ...args: unknown[]): string {
    return product.attributes.image.data[0].attributes.url;
  }
}
