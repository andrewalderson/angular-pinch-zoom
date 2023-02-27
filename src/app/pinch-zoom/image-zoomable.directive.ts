import { coerceElement } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  OnDestroy,
} from '@angular/core';
import {
  filter,
  fromEventPattern,
  map,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {
  PointerTracker,
  PointerTrackerFactory,
} from '../pointer/pointer-tracker';
import { getDistance } from '../utils/math';
import { ApzImageDirective } from './image.directive';

@Directive({
  selector: '[apzImage][zoomable]',
  standalone: true,
})
export class ApzImageZoomableDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class') readonly _hostClasses = 'apz-image--zoomable';

  #elementRef = inject(ElementRef<HTMLElement>);
  #image = inject(ApzImageDirective, { self: true });
  #pointerTrackerFactory = inject(PointerTrackerFactory);
  #pointerTracker!: PointerTracker;
  #destroyed = new Subject<void>();

  #previousPointers?: PointerEvent[];

  ngAfterViewInit() {
    const element = coerceElement(this.#elementRef);
    this.#pointerTracker = this.#pointerTrackerFactory.create(
      coerceElement(element)
    );

    fromEventPattern<WheelEvent>(
      (handler) =>
        element.addEventListener('wheel', handler, {
          passive: false, // some browsers default this to true. It needs to be false for 'event.preventDefault()' to work
          capture: true,
        }),
      (handler) =>
        element.removeEventListener('wheel', handler, {
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

    this.#pointerTracker.start
      .pipe(
        takeUntil(this.#destroyed),
        filter(() => this.#pointerTracker.currentPointers.size === 2),
        tap((event: PointerEvent) => event.preventDefault()),
        tap(
          () =>
            (this.#previousPointers = Array.from(
              this.#pointerTracker.currentPointers.values()
            ))
        ),
        switchMap(() =>
          this.#pointerTracker.move.pipe(
            takeUntil(
              this.#pointerTracker.end.pipe(
                filter(() => this.#pointerTracker.currentPointers.size === 0)
              )
            ),
            filter(
              () =>
                this.#previousPointers?.length === 2 &&
                this.#pointerTracker.currentPointers.size === 2
            ),
            tap((event: PointerEvent) => event.preventDefault()),
            map(() =>
              Array.from(this.#pointerTracker.currentPointers.values())
            ),
            map((currentPointers: PointerEvent[]) =>
              getDistance(currentPointers[0], currentPointers[1])
            ),
            map(
              (newDistance: number) =>
                (newDistance -
                  getDistance(
                    this.#previousPointers?.[0],
                    this.#previousPointers?.[1]
                  )) *
                0.1
            ),
            tap(
              () =>
                (this.#previousPointers = Array.from(
                  this.#pointerTracker.currentPointers.values()
                ))
            ),
            filter((scale) => scale !== 0)
          )
        )
      )
      .subscribe((scale: number) => this.#image.zoom(scale));
  }

  ngOnDestroy(): void {
    this.#destroyed.next();
    this.#destroyed.complete();
  }
}
