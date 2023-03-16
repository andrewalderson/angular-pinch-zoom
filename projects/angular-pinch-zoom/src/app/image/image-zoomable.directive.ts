import { coerceElement } from "@angular/cdk/coercion";
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  OnDestroy,
} from "@angular/core";
import { filter, fromEventPattern, map, Subject, takeUntil, tap } from "rxjs";
import { PinchZoomDirective } from "../gesture/pinch-zoom.directive";
import { ApzImageDirective } from "./image.directive";

@Directive({
  selector: "[apzImage][zoomable]",
  standalone: true,
  hostDirectives: [PinchZoomDirective],
})
export class ApzImageZoomableDirective implements AfterViewInit, OnDestroy {
  @HostBinding("class") readonly _hostClasses = "apz-image--zoomable";

  #elementRef = inject(ElementRef<HTMLElement>);
  #image = inject(ApzImageDirective, { self: true });
  #destroyed = new Subject<void>();

  #pinchZoom = inject(PinchZoomDirective, { self: true });

  ngAfterViewInit() {
    const element = coerceElement(this.#elementRef);

    fromEventPattern<WheelEvent>(
      (handler) =>
        element.addEventListener("wheel", handler, {
          passive: false, // some browsers default this to true. It needs to be false for 'event.preventDefault()' to work
          capture: true,
        }),
      (handler) =>
        element.removeEventListener("wheel", handler, {
          passive: false,
          capture: true,
        })
    )
      .pipe(
        takeUntil(this.#destroyed),
        tap((event: WheelEvent) => event.preventDefault()),
        map(
          (event: WheelEvent) =>
            /**
             * touchpad wheel will have the ctrlKey set to true
             * We need to zoom in smaller increments on a trackpad to give
             * the user more control
             * Yes, a user could use a mouse wheel with the ctrl key also
             * but they could also just take their finger off of the key
             *
             * The deltaY can be different depending on the device
             * manufacturer and the browser vendor
             * Math.sign will normalize it to a value of either -1, 0 or 1
             */
            Math.sign(event.deltaY) * (event.ctrlKey ? 0.1 : 1)
        ),
        filter((scale) => scale !== 0)
      )
      .subscribe((scale) => this.#image.zoom(scale));

    this.#pinchZoom.distanceChanged
      .pipe(takeUntil(this.#destroyed))
      .subscribe((distance) => this.#image.zoom(distance * 0.1));
  }

  ngOnDestroy(): void {
    this.#destroyed.next();
    this.#destroyed.complete();
  }
}
