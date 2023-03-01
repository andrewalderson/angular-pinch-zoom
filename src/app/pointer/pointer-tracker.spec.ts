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

  it('should add, update and delete the events in the pointers map', async () => {
    tracker.start.subscribe();

    let pointerId = 1;
    let event = new PointerEvent('pointerdown', { pointerId });
    element.dispatchEvent(event);

    let pointer1 = {
      initial: event,
      previous: event,
      current: event,
    };
    expect(tracker.pointers.size).toEqual(1);
    expect(tracker.pointers.get(pointerId)).toEqual(
      expect.objectContaining(pointer1)
    );

    pointerId = 2;
    event = new PointerEvent('pointerdown', { pointerId });
    element.dispatchEvent(event);

    let pointer2 = {
      initial: event,
      previous: event,
      current: event,
    };
    expect(tracker.pointers.size).toEqual(2);
    expect(tracker.pointers.get(pointerId)).toEqual(
      expect.objectContaining(pointer2)
    );

    tracker.move.subscribe();

    pointerId = 1;
    event = new PointerEvent('pointermove', { pointerId });
    element.dispatchEvent(event);

    pointer1 = {
      initial: event,
      previous: pointer1.current,
      current: event,
    };
    expect(tracker.pointers.size).toEqual(2);
    expect(tracker.pointers.get(pointerId)).toEqual(
      expect.objectContaining(pointer1)
    );

    pointerId = 2;
    event = new PointerEvent('pointermove', { pointerId });
    element.dispatchEvent(event);

    pointer2 = {
      initial: event,
      previous: pointer2.current,
      current: event,
    };
    expect(tracker.pointers.size).toEqual(2);
    expect(tracker.pointers.get(pointerId)).toEqual(
      expect.objectContaining(pointer2)
    );

    tracker.end.subscribe();

    pointerId = 1;
    event = new PointerEvent('pointerup', { pointerId });
    element.dispatchEvent(event);

    expect(tracker.pointers.size).toEqual(1);
    expect(tracker.pointers.get(pointerId)).toBeUndefined();

    pointerId = 2;
    event = new PointerEvent('pointerup', { pointerId });
    element.dispatchEvent(event);

    expect(tracker.pointers.size).toEqual(0);
    expect(tracker.pointers.get(pointerId)).toBeUndefined();
  });
});
