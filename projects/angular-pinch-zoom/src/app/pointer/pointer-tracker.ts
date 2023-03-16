/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { fromEventPattern, Observable, tap } from 'rxjs';

class Pointer {
  current: PointerEvent;
  previous: PointerEvent;
  initial: PointerEvent;

  constructor(event: PointerEvent) {
    this.initial = this.previous = this.current = event;
  }

  update(event: PointerEvent) {
    this.previous = this.current;
    this.current = event;
  }
}

class PointerTracker {
  readonly start: Observable<PointerEvent>;
  readonly move: Observable<PointerEvent>;
  readonly end: Observable<PointerEvent>;

  #pointers = new Map<number, Pointer>();

  get pointers(): ReadonlyMap<number, Pointer> {
    return this.#pointers;
  }

  constructor(target: Element) {
    this.start = fromEventPattern<PointerEvent>(
      (handler) => target.addEventListener('pointerdown', handler),
      (handler) => target.removeEventListener('pointerdown', handler)
    ).pipe(
      tap((event: PointerEvent) => event.preventDefault()),
      tap((event: PointerEvent) => {
        this.#pointers.set(event.pointerId, new Pointer(event));
      })
    );

    this.move = fromEventPattern<PointerEvent>(
      (handler) => target.addEventListener('pointermove', handler),
      (handler) => target.removeEventListener('pointermove', handler)
    ).pipe(
      tap((event: PointerEvent) => {
        const pointer = this.#pointers.get(event.pointerId);
        if (pointer) {
          pointer.update(event);
        }
      })
    );

    this.end = fromEventPattern<PointerEvent>(
      (handler) => {
        target.addEventListener('pointerup', handler);
        target.addEventListener('pointercancel', handler);
      },
      (handler) => {
        if (this.#pointers.size === 0) {
          target.removeEventListener('pointerup', handler);
          target.removeEventListener('pointercancel', handler);
        }
      }
    ).pipe(
      tap((event: PointerEvent) => {
        this.#pointers.delete(event.pointerId);
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class PointerTrackerFactory {
  create(element: Element) {
    return new PointerTracker(element);
  }
}

// keep the class private (internal)
// but export its type
type PointerTrackerType = PointerTracker;
type PointerType = Pointer;
export { PointerTrackerType as PointerTracker, PointerType as Pointer };
