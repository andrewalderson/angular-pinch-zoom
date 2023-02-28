/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { filter, fromEventPattern, Observable, tap } from 'rxjs';

class PointerTracker {
  readonly start: Observable<PointerEvent>;
  readonly move: Observable<PointerEvent>;
  readonly end: Observable<PointerEvent>;

  #currentPointers = new Map<number, PointerEvent>();

  get currentPointers(): ReadonlyMap<number, PointerEvent> {
    return this.#currentPointers;
  }

  #previousPointers = new Map<number, PointerEvent>();

  get previousPointers(): ReadonlyMap<number, PointerEvent> {
    return this.#previousPointers;
  }

  #startPointers = new Map<number, PointerEvent>();

  get startPointers(): ReadonlyMap<number, PointerEvent> {
    return this.#startPointers;
  }

  constructor(target: Element) {
    this.start = fromEventPattern<PointerEvent>(
      (handler) => target.addEventListener('pointerdown', handler),
      (handler) => target.removeEventListener('pointerdown', handler)
    ).pipe(
      tap((event: PointerEvent) => {
        this.#currentPointers.set(event.pointerId, event);
        this.#startPointers.set(event.pointerId, event);
      })
    );

    this.move = fromEventPattern<PointerEvent>(
      (handler) => target.addEventListener('pointermove', handler),
      (handler) => target.removeEventListener('pointermove', handler)
    ).pipe(
      filter((event) => !!this.#currentPointers.get(event.pointerId)),
      tap((event: PointerEvent) => {
        this.#currentPointers.forEach((value, key) => {
          this.#previousPointers.set(key, value);
        });
        this.#currentPointers.set(event.pointerId, event);
      })
    );

    this.end = fromEventPattern<PointerEvent>(
      (handler) => {
        target.addEventListener('pointerup', handler);
        target.addEventListener('pointercancel', handler);
      },
      (handler) => {
        if (this.currentPointers.size === 0) {
          target.removeEventListener('pointerup', handler);
          target.removeEventListener('pointercancel', handler);
        }
      }
    ).pipe(
      tap((event: PointerEvent) => {
        this.#currentPointers.delete(event.pointerId);
        this.#previousPointers.delete(event.pointerId);
        this.#startPointers.delete(event.pointerId);
      })
    );
  }
}

// keep the class private (internal)
// but export its type
type PointerTrackerType = PointerTracker;
export { PointerTrackerType as PointerTracker };

@Injectable({
  providedIn: 'root',
})
export class PointerTrackerFactory {
  create(element: Element) {
    return new PointerTracker(element);
  }
}
