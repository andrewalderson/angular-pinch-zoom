import { faker } from '@faker-js/faker';
import { ApzImageZoomableDirective } from './image-zoomable.directive';
import { ApzImageDirective } from './image.directive';
import { allScaleSteps } from './testing/image-zoomable-data';

function round(value: number, decimals: number = 0) {
  return +value.toFixed(decimals);
}

function verifyDimensions(
  expected: DOMRect,
  actual: { x: number; y: number; width: number; height: number }
) {
  const { x, y, width, height } = expected;

  /**
   * we are rounding the values to accomodate for any
   * differences in precision between the test values
   * and the values produced by the SUT
   * using 2 decimals places because that should be good enough
   */
  const decimals = 2;
  expect(round(x, decimals)).to.eq(round(actual.x, decimals));
  expect(round(y, decimals)).to.eq(round(actual.y, decimals));
  expect(round(width, decimals)).to.eq(round(actual.width, decimals));
  expect(round(height, decimals)).to.eq(round(actual.height, decimals));
}

describe(ApzImageDirective.name, () => {
  it("should add the class 'apz-image--zoomable' to the img element", () => {
    cy.mount('<img apzImage zoomable/>', {
      imports: [ApzImageDirective, ApzImageZoomableDirective],
    });

    cy.get('img').should('have.class', 'apz-image--zoomable');
  });

  allScaleSteps.forEach((scaleSteps) => {
    describe(`scale with the ${scaleSteps.type}`, () => {
      scaleSteps.steps.forEach(
        ({ scaleStep, imageWidth, imageHeight, values }) => {
          it(`should zoom the image in and out when the scaleStep equals ${scaleStep}`, () => {
            cy.mount(
              `<div data-testid="container"
              style="width:'${imageWidth}px'; height:'${imageHeight}px'">
            <img apzImage zoomable [src]="src" [scaleStep]="scaleStep" style="transition:none"/>
           </div>`,
              {
                imports: [ApzImageDirective, ApzImageZoomableDirective],
                componentProperties: {
                  src: faker.image.dataUri(imageWidth, imageHeight),
                  scaleStep,
                },
              }
            );
            values.forEach(({ event, x, y, width, height }) => {
              cy.get('[data-testid="container"]')
                .trigger(event.type, event.options)
                .wait(10) // need to wait for the image dimensions to stabalize
                .get('img')
                .then(($image) => {
                  verifyDimensions($image.get(0).getBoundingClientRect(), {
                    x,
                    y,
                    width,
                    height,
                  });
                });
            });
          });
        }
      );
    });
  });
});
