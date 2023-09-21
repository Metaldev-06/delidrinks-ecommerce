import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dispatched',
})
export class DispatchedPipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): string {
    if (value) {
      return 'enviado';
    } else {
      return 'no Enviado';
    }
  }
}
