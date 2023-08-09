import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulty',
})
export class DifficultyPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const difficultyMap: { [key: number]: string } = {
      1: 'Principiante',
      2: 'Intermedio',
    };

    return difficultyMap[value] || 'Avanzado';
  }
}
