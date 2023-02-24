import { coerceElement } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  inject,
} from '@angular/core';
import { ApzImageDirective } from './image.directive';

@Directive({
  selector: '[apzImage][zoomable]',
  standalone: true,
})
export class ApzImageZoomableDirective implements AfterViewInit {
  @HostBinding('class') readonly _hostClasses = 'apz-image--zoomable';

  #elementRef = inject(ElementRef<HTMLElement>);
  #image = inject(ApzImageDirective, { self: true });

  ngAfterViewInit() {
    const element = coerceElement(this.#elementRef) as EventTarget;
    element.addEventListener('wheel', this.onwheel, {
      passive: false, // some browsers default this to true. It needs to be false for 'event.preventDefault()' to work
      capture: true,
    });
  }

  onwheel = (event: Event) => {
    event.preventDefault();
    const { deltaY, ctrlKey } = event as WheelEvent;
    /**
     * The deltaY can be different depending on the device
     * manufacturer and the browser vendor
     * This will normalize it to a value of either -1, 0 or 1
     */
    let scale = Math.sign(deltaY);

    /**
     * touchpad wheel will have the ctrlKey set to true
     * We need to zoom in smaller increments on a trackpad to give
     * the user more control
     * Yes, a user could use a mouse wheel with the ctrl key also
     * but they could also just take their finger off of the key
     */
    scale = scale * (ctrlKey ? 0.1 : 1);

    this.#image.zoom(scale);
  };
}
