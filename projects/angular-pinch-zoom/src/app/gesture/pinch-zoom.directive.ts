import { coerceElement } from "@angular/cdk/coercion";
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
} from "@angular/core";
import { filter, map, Subject, switchMap, takeUntil, tap } from "rxjs";
import { PointerTrackerFactory } from "../pointer/pointer-tracker";
import { getDistance } from "../utils/math";

@Directive({
  selector: "[apzPinchZoom]",
  standalone: true,
})
export class PinchZoomDirective implements AfterViewInit, OnDestroy {
  #elementRef = inject(ElementRef<HTMLElement>);
  #pointerTrackerFactory = inject(PointerTrackerFactory);
  #destroyed = new Subject<void>();
  /**
   * The distance between the 2 pointers
   */
  @Output("apzPinchZoomDistanceChanged") distanceChanged =
    new EventEmitter<number>();

  ngAfterViewInit() {
    const element = coerceElement(this.#elementRef);
    const pointerTracker = this.#pointerTrackerFactory.create(element);

    pointerTracker.start
      .pipe(
        takeUntil(this.#destroyed),
        switchMap(() =>
          pointerTracker.move.pipe(
            takeUntil(
              pointerTracker.end.pipe(
                filter(() => pointerTracker.pointers.size === 0)
              )
            ),
            filter(() => pointerTracker.pointers.size === 2),
            tap((event: PointerEvent) => event.preventDefault()),
            map(() => Array.from(pointerTracker.pointers.values())),
            map(
              (pointers) =>
                getDistance(pointers[0].current, pointers[1].current) -
                getDistance(pointers[0].previous, pointers[1].previous)
            ),
            filter((distance) => distance !== 0)
          )
        )
      )
      .subscribe((distance: number) => this.distanceChanged.emit(distance));
  }

  ngOnDestroy(): void {
    this.#destroyed.next();
    this.#destroyed.complete();
  }
}
