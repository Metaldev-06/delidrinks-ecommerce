import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { RecipeDatum } from 'src/app/core/interfaces/recipe.interfaces';

@Component({
  selector: 'app-recipe-slider',
  templateUrl: './recipe-slider.component.html',
  styleUrls: ['./recipe-slider.component.scss'],
})
export class RecipeSliderComponent implements OnChanges {
  @Input() title!: string;
  @Input() recipes!: RecipeDatum[];
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  slider!: KeenSliderInstance;
  currentSlide: number = 1;

  ngOnChanges() {
    setTimeout(() => {
      this.slider = new KeenSlider(
        this.sliderRef.nativeElement,
        {
          loop: true,
          breakpoints: {
            '(min-width: 500px)': {
              slides: { perView: 2, spacing: 5 },
            },
            '(min-width: 1000px)': {
              slides: { perView: 3, spacing: 10 },
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
        }
        // [
        //   (slider) => {
        //     let timeout: any;
        //     let mouseOver = false;
        //     function clearNextTimeout() {
        //       clearTimeout(timeout);
        //     }
        //     function nextTimeout() {
        //       clearTimeout(timeout);
        //       if (mouseOver) return;
        //       timeout = setTimeout(() => {
        //         slider.next();
        //       }, 5000);
        //     }
        //     slider.on('created', () => {
        //       slider.container.addEventListener('mouseover', () => {
        //         mouseOver = true;
        //         clearNextTimeout();
        //       });
        //       slider.container.addEventListener('mouseout', () => {
        //         mouseOver = false;
        //         nextTimeout();
        //       });
        //       nextTimeout();
        //     });
        //     slider.on('dragStarted', clearNextTimeout);
        //     slider.on('animationEnded', nextTimeout);
        //     slider.on('updated', nextTimeout);
        //   },
        // ]
      );
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
