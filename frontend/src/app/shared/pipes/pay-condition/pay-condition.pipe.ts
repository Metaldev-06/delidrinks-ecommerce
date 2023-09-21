import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payCondition',
})
export class PayConditionPipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): string {
    if (value) {
      return 'pagado';
    } else {
      return 'pendiente';
    }
  }
}
