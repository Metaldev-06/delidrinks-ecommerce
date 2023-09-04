import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageByCountry',
})
export class ImageByCountryPipe implements PipeTransform {
  private countryImages: { [country: string]: string } = {
    argentina: '../../../../../../assets/images/argentina.jpg',
    colombia: '../../../../../../assets/images/colombia.svg',
    mexico: '../../../../../../assets/images/mexico.svg',
    venezuela: '../../../../../../assets/images/venezuela.svg',
  };

  transform(value: string): string {
    return this.countryImages[value] || '';
  }
}
