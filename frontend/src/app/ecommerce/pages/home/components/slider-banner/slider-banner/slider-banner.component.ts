import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-slider-banner',
  templateUrl: './slider-banner.component.html',
  styleUrls: ['./slider-banner.component.scss'],
})
export class SliderBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  slider!: KeenSliderInstance;
  currentSlide: number = 1;

  sliderInfo = [
    {
      brand: 'JOHNNIE WALKER',
      name: 'DOUBLE BLACK LABEL',
      description:
        'Johnnie Walker Double Black está inspirado en los sabores icónicos de Johnnie Walker Black Label, acentuándolos para crear una mezcla con una intensidad sin precedentes. Influenciado por los poderosos whiskies de la costa oeste y la región de las Islas, Johnnie Walker Double Black se disfruta mejor con agua para liberar sus complejas notas de especias ardientes y humo. Una mezcla increíble para compartir sin importar la ocasión.',
      image:
        '../../../../../../../assets/images/01-johnnie-walker-double-black.webp',
    },
    {
      brand: 'JOHNNIE WALKER',
      name: 'GOLD LABEL RESERVE',

      description:
        'Johnnie Walker Gold Label Reserve es la mezcla perfecta para una celebración indulgente. Lujoso, cremoso y con notas de miel, es un gran tributo a la unión armoniosa entre los whiskies de Speyside y Highland con vestigios de madera ahumada de la costa oeste. Johnnie Walker Gold Label Reserve está hecho para compartir esas noches inolvidables con amigos increíbles.',
      image:
        '../../../../../../../assets/images/01-johnnie-walker-gold-label-reserve.webp',
    },
    {
      brand: 'JOHNNIE WALKER',
      name: 'BLUE LABEL',
      description:
        'Johnnie Walker Blue Label es una obra maestra inigualable. Es una mezcla exquisita hecha con algunos de los whiskies más raros y excepcionales de Escocia. Solo uno de cada diez mil barriles tiene la calidad exclusiva y el carácter para entregar el sabor insignia e inolvidable de Johnnie Walker Blue Label. Un whisky extraordinario para ocasiones extraordinarias.',
      image:
        '../../../../../../../assets/images/01-johnnie-walker-blue-label.webp',
    },
  ];

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
      },
      [
        (slider) => {
          let timeout: any;
          let mouseOver = false;
          function clearNextTimeout() {
            clearTimeout(timeout);
          }
          function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => {
              slider.next();
            }, 5000);
          }
          slider.on('created', () => {
            slider.container.addEventListener('mouseover', () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener('mouseout', () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          });
          slider.on('dragStarted', clearNextTimeout);
          slider.on('animationEnded', nextTimeout);
          slider.on('updated', nextTimeout);
        },
      ]
    );
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
