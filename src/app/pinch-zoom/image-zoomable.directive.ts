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
  exhaustMap,
  filter,
  forkJoin,
  fromEventPattern,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { PointerTrackerFactory } from '../pointer/pointer-tracker';
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
  #destroyed = new Subject<void>();

  ngAfterViewInit() {
    const element = coerceElement(this.#elementRef);
    const pointerTracker = this.#pointerTrackerFactory.create(
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

    pointerTracker.start
      .pipe(
        takeUntil(this.#destroyed),
        tap((event: PointerEvent) => event.preventDefault()),
        switchMap(() =>
          pointerTracker.move.pipe(
            takeUntil(
              pointerTracker.end.pipe(
                filter(() => pointerTracker.currentPointers.size === 0)
              )
            ),
            filter(
              () =>
                pointerTracker.previousPointers.size === 2 &&
                pointerTracker.currentPointers.size === 2
            ),
            tap((event: PointerEvent) => event.preventDefault()),
            exhaustMap(() =>
              forkJoin({
                previous: of(
                  Array.from(pointerTracker.previousPointers.values())
                ),
                current: of(
                  Array.from(pointerTracker.currentPointers.values())
                ),
              }).pipe(
                map(
                  ({ previous, current }) =>
                    (getDistance(current[0], current[1]) -
                      getDistance(previous[0], previous[1])) *
                    0.1
                ),
                filter((scale) => scale !== 0)
              )
            )
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
