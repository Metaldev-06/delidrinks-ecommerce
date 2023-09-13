import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from 'src/app/core/interfaces/product';

@Pipe({
  name: 'brandPipe',
})
export class BrandPipePipe implements PipeTransform {
  transform(value: Brand, ...args: unknown[]): string {
    return value.data.attributes.name;
  }
}
