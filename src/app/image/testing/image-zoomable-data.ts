const mouseDeltaY = 150; // using 150 because that is what my mouse sets the value at for mousewheel events
const trackpadDeltaY = 5;
const wheelEventType = 'wheel';
// the image width and height values don't matter for the tests
// they are just used to calculate the expected values for x, y, width, height
export const mouseScaleSteps = [
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.1,
    values: [
      {
        event: { type: wheelEventType, options: { deltaY: 0, ctrlKey: false } },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: mouseDeltaY, ctrlKey: false },
        },
        x: -20,
        y: -20,
        width: 440,
        height: 440,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: mouseDeltaY, ctrlKey: false },
        },
        x: -42,
        y: -42,
        width: 484,
        height: 484,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: -1 * mouseDeltaY, ctrlKey: false },
        },
        x: -20,
        y: -20,
        width: 440,
        height: 440,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: -1 * mouseDeltaY, ctrlKey: false },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.2,
    values: [
      {
        event: { type: wheelEventType, options: { deltaY: 0, ctrlKey: false } },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: mouseDeltaY, ctrlKey: false },
        },
        x: -40,
        y: -40,
        width: 480,
        height: 480,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: mouseDeltaY, ctrlKey: false },
        },
        x: -88,
        y: -88,
        width: 576,
        height: 576,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: -1 * mouseDeltaY, ctrlKey: false },
        },
        x: -40,
        y: -40,
        width: 480,
        height: 480,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: -1 * mouseDeltaY, ctrlKey: false },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.3,
    values: [
      {
        event: { type: 'wheel', options: { deltaY: 0, ctrlKey: false } },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'wheel',
          options: { deltaY: mouseDeltaY, ctrlKey: false },
        },
        x: -60,
        y: -60,
        width: 520,
        height: 520,
      },
      {
        event: {
          type: 'wheel',
          options: { deltaY: mouseDeltaY, ctrlKey: false },
        },
        x: -138,
        y: -138,
        width: 676,
        height: 676,
      },
      {
        event: {
          type: 'wheel',
          options: { deltaY: -1 * mouseDeltaY, ctrlKey: false },
        },
        x: -60,
        y: -60,
        width: 520,
        height: 520,
      },
      {
        event: {
          type: 'wheel',
          options: { deltaY: -1 * mouseDeltaY, ctrlKey: false },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
];

export const trackpadScaleSteps = [
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.1,
    values: [
      {
        event: { type: wheelEventType, options: { deltaY: 0, ctrlKey: true } },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: trackpadDeltaY, ctrlKey: true },
        },
        x: -2,
        y: -2,
        width: 404,
        height: 404,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: trackpadDeltaY, ctrlKey: true },
        },
        x: -4.02,
        y: -4.02,
        width: 408.04,
        height: 408.04,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: -1 * trackpadDeltaY, ctrlKey: true },
        },
        x: -2,
        y: -2,
        width: 404,
        height: 404,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: -1 * trackpadDeltaY, ctrlKey: true },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.2,
    values: [
      {
        event: { type: wheelEventType, options: { deltaY: 0, ctrlKey: true } },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: trackpadDeltaY, ctrlKey: true },
        },
        x: -4,
        y: -4,
        width: 408,
        height: 408,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: trackpadDeltaY, ctrlKey: true },
        },
        x: -8.08,
        y: -8.08,
        width: 416.16,
        height: 416.16,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: -1 * trackpadDeltaY, ctrlKey: true },
        },
        x: -4,
        y: -4,
        width: 408,
        height: 408,
      },
      {
        event: {
          type: wheelEventType,
          options: { deltaY: -1 * trackpadDeltaY, ctrlKey: true },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.3,
    values: [
      {
        event: { type: 'wheel', options: { deltaY: 0, ctrlKey: true } },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'wheel',
          options: { deltaY: trackpadDeltaY, ctrlKey: true },
        },
        x: -6,
        y: -6,
        width: 412,
        height: 412,
      },
      {
        event: {
          type: 'wheel',
          options: { deltaY: trackpadDeltaY, ctrlKey: true },
        },
        x: -12.18,
        y: -12.18,
        width: 424.36,
        height: 424.36,
      },
      {
        event: {
          type: 'wheel',
          options: { deltaY: -1 * trackpadDeltaY, ctrlKey: true },
        },
        x: -6,
        y: -6,
        width: 412,
        height: 412,
      },
      {
        event: {
          type: 'wheel',
          options: { deltaY: -1 * trackpadDeltaY, ctrlKey: true },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
];

const pointer1Pos = 100;
const pointer2Pos = 200;
const touchScaleSteps = [
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.1,
    values: [
      {
        event: {
          type: 'pointerdown',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 10,
            y: pointer1Pos - 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerdown',
          options: {
            pointerId: 2,
            x: pointer2Pos,
            y: pointer2Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -20,
        y: -20,
        width: 440,
        height: 440,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 20,
            y: pointer1Pos - 20,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -42,
        y: -42,
        width: 484,
        height: 484,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 20,
            y: pointer2Pos + 20,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -66.2,
        y: -66.2,
        width: 532.4,
        height: 532.4,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 10,
            y: pointer1Pos - 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -66.2,
        y: -66.2,
        width: 532.4,
        height: 532.4,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -42,
        y: -42,
        width: 484,
        height: 484,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -20,
        y: -20,
        width: 440,
        height: 440,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos,
            y: pointer2Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerup',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerup',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.2,
    values: [
      {
        event: {
          type: 'pointerdown',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 10,
            y: pointer1Pos - 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerdown',
          options: {
            pointerId: 2,
            x: pointer2Pos,
            y: pointer2Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -40,
        y: -40,
        width: 480,
        height: 480,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 20,
            y: pointer1Pos - 20,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -88,
        y: -88,
        width: 576,
        height: 576,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 20,
            y: pointer2Pos + 20,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -145.6,
        y: -145.6,
        width: 691.2,
        height: 691.2,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 10,
            y: pointer1Pos - 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -145.6,
        y: -145.6,
        width: 691.2,
        height: 691.2,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -88,
        y: -88,
        width: 576,
        height: 576,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -40,
        y: -40,
        width: 480,
        height: 480,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos,
            y: pointer2Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerup',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerup',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
  {
    imageWidth: 400,
    imageHeight: 400,
    scaleStep: 0.3,
    values: [
      {
        event: {
          type: 'pointerdown',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 10,
            y: pointer1Pos - 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerdown',
          options: {
            pointerId: 2,
            x: pointer2Pos,
            y: pointer2Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -60,
        y: -60,
        width: 520,
        height: 520,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 20,
            y: pointer1Pos - 20,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -138,
        y: -138,
        width: 676,
        height: 676,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 20,
            y: pointer2Pos + 20,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -239.4,
        y: -239.4,
        width: 878.8,
        height: 878.8,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos - 10,
            y: pointer1Pos - 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -239.4,
        y: -239.4,
        width: 878.8,
        height: 878.8,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -138,
        y: -138,
        width: 676,
        height: 676,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: -60,
        y: -60,
        width: 520,
        height: 520,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos,
            y: pointer2Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerup',
          options: {
            pointerId: 1,
            x: pointer1Pos,
            y: pointer1Pos,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointermove',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
      {
        event: {
          type: 'pointerup',
          options: {
            pointerId: 2,
            x: pointer2Pos + 10,
            y: pointer2Pos + 10,
            eventConstructor: 'PointerEvent',
          },
        },
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      },
    ],
  },
];
export const allScaleSteps = [
  { type: 'mouse', steps: mouseScaleSteps },
  { type: 'trackpad', steps: trackpadScaleSteps },
  { type: 'touch', steps: touchScaleSteps },
];
