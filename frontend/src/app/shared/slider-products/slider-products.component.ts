import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { ProductDatum } from 'src/app/core/interfaces/product';

interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

@Component({
  selector: 'app-slider-products',
  templateUrl: './slider-products.component.html',
  styleUrls: ['./slider-products.component.scss'],
})
export class SliderProductsComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() products!: ProductDatum[];
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  responsiveOptions!: ResponsiveOptions[];
  slider!: KeenSliderInstance;
  currentSlide: number = 1;

  ngOnInit() {}

  ngOnChanges() {
    setTimeout(() => {
      this.slider = new KeenSlider(
        this.sliderRef.nativeElement,
        {
          loop: true,
          breakpoints: {
            '(min-width: 616px)': {
              slides: { perView: 2, spacing: 5 },
            },
            '(min-width: 870px)': {
              slides: { perView: 3, spacing: 5 },
            },
            '(min-width: 1120px)': {
              slides: { perView: 4, spacing: 5 },
            },
            '(min-width: 1400px)': {
              slides: { perView: 5, spacing: 5 },
            },
          },
          slides: {
            perView: 1,
            spacing: 10,
          },
          initial: this.currentSlide,
          slideChanged: (s) => {
            this.currentSlide = s.track.details.rel;
          },
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
    });
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.slider = new KeenSlider(
  //       this.sliderRef.nativeElement,
  //       {
  //         loop: true,
  //         breakpoints: {
  //           '(min-width: 616px)': {
  //             slides: { perView: 2, spacing: 5 },
  //           },
  //           '(min-width: 870px)': {
  //             slides: { perView: 3, spacing: 5 },
  //           },
  //           '(min-width: 1120px)': {
  //             slides: { perView: 4, spacing: 5 },
  //           },
  //           '(min-width: 1400px)': {
  //             slides: { perView: 5, spacing: 5 },
  //           },
  //         },
  //         slides: {
  //           perView: 1,
  //           spacing: 10,
  //         },
  //         initial: this.currentSlide,
  //         slideChanged: (s) => {
  //           this.currentSlide = s.track.details.rel;
  //         },
  //       },
  //       [
  //         (slider) => {
  //           let timeout: any;
  //           let mouseOver = false;
  //           function clearNextTimeout() {
  //             clearTimeout(timeout);
  //           }
  //           function nextTimeout() {
  //             clearTimeout(timeout);
  //             if (mouseOver) return;
  //             timeout = setTimeout(() => {
  //               slider.next();
  //             }, 5000);
  //           }
  //           slider.on('created', () => {
  //             slider.container.addEventListener('mouseover', () => {
  //               mouseOver = true;
  //               clearNextTimeout();
  //             });
  //             slider.container.addEventListener('mouseout', () => {
  //               mouseOver = false;
  //               nextTimeout();
  //             });
  //             nextTimeout();
  //           });
  //           slider.on('dragStarted', clearNextTimeout);
  //           slider.on('animationEnded', nextTimeout);
  //           slider.on('updated', nextTimeout);
  //         },
  //       ]
  //     );
  //   });
  // }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
