import { TestBed } from '@angular/core/testing';
import { PointerTracker, PointerTrackerFactory } from './pointer-tracker';

class PointerEvent extends Event {
  pointerId?: number;
  constructor(type: string, init: PointerEventInit) {
    super(type, init);

    this.pointerId = init.pointerId;
  }
}

describe('PoinerTracker', () => {
  let tracker: PointerTracker;
  let element: Element;
  beforeEach(() => {
    // PointerEvent is not implemented in Jest or JsDOM
    // need to mock this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.window.PointerEvent = PointerEvent as any;
    element = document.createElement('div');
    tracker = TestBed.inject(PointerTrackerFactory).create(element);
  });

  it('should add, update and delete the events in the pointer maps', async () => {
    tracker.start.subscribe();

    let pointerId = 1;
    let event = new PointerEvent('pointerdown', { pointerId });
    element.dispatchEvent(event);

    expect(tracker.currentPointers.size).toEqual(1);
    expect(tracker.currentPointers.get(pointerId)).toBe(event);
    expect(tracker.startPointers.size).toEqual(1);
    expect(tracker.startPointers.get(pointerId)).toBe(event);

    pointerId = 2;
    event = new PointerEvent('pointerdown', { pointerId });
    element.dispatchEvent(event);

    expect(tracker.currentPointers.size).toEqual(2);
    expect(tracker.currentPointers.get(pointerId)).toBe(event);
    expect(tracker.startPointers.size).toEqual(2);
    expect(tracker.startPointers.get(pointerId)).toBe(event);

    tracker.move.subscribe();

    pointerId = 1;
    event = new PointerEvent('pointermove', { pointerId });
    element.dispatchEvent(event);

    expect(tracker.currentPointers.size).toEqual(2);
    expect(tracker.currentPointers.get(pointerId)).toBe(event);
    expect(tracker.previousPointers.size).toEqual(2);
    expect(tracker.previousPointers.get(pointerId)).not.toBe(event);

    pointerId = 2;
    event = new PointerEvent('pointermove', { pointerId });
    element.dispatchEvent(event);

    expect(tracker.currentPointers.size).toEqual(2);
    expect(tracker.currentPointers.get(pointerId)).toBe(event);
    expect(tracker.previousPointers.size).toEqual(2);
    expect(tracker.previousPointers.get(pointerId)).not.toBe(event);

    tracker.end.subscribe();

    pointerId = 1;
    event = new PointerEvent('pointerup', { pointerId });
    element.dispatchEvent(event);

    expect(tracker.currentPointers.size).toEqual(1);
    expect(tracker.currentPointers.get(pointerId)).toBeUndefined();
    expect(tracker.previousPointers.size).toEqual(1);
    expect(tracker.previousPointers.get(pointerId)).toBeUndefined();
    expect(tracker.startPointers.size).toEqual(1);
    expect(tracker.startPointers.get(pointerId)).toBeUndefined();

    pointerId = 2;
    event = new PointerEvent('pointerup', { pointerId });
    element.dispatchEvent(event);

    expect(tracker.currentPointers.size).toEqual(0);
    expect(tracker.currentPointers.get(pointerId)).toBeUndefined();
    expect(tracker.previousPointers.size).toEqual(0);
    expect(tracker.previousPointers.get(pointerId)).toBeUndefined();
    expect(tracker.startPointers.size).toEqual(0);
    expect(tracker.startPointers.get(pointerId)).toBeUndefined();
  });
});
