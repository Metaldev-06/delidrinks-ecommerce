import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPrimary',
})
export class IsPrimaryPipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): string {
    return value ? 'Primario' : 'Adicional';
  }
}
