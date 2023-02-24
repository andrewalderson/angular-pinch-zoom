import { faker } from '@faker-js/faker';
import { ApzImageDirective } from './image.directive';
import { allObjectFits } from './testing/image-data';

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
  it("should add the class 'apz-image' to the img element", () => {
    cy.mount('<img apzImage />', {
      imports: [ApzImageDirective],
    });

    cy.get('img').should('have.class', 'apz-image');
  });

  describe('size image on load', () => {
    allObjectFits.forEach(({ type, dimensions }) => {
      describe(`with 'objectFit' equals '${type.objectFit}' `, () => {
        dimensions.forEach(
          ({
            reason,
            parentWidth,
            parentHeight,
            imageWidth,
            imageHeight,
            expected,
          }) => {
            it(`should ${type.description} when ${reason}`, () => {
              cy.mount(
                `<div style="width: ${parentWidth}px; height: ${parentHeight}px;">
                  <img apzImage [src]="src" [objectFit]="objectFit" style="transition:none"/>
                 </div>`,
                {
                  imports: [ApzImageDirective],
                  componentProperties: {
                    src: faker.image.dataUri(imageWidth, imageHeight),
                    objectFit: type.objectFit,
                  },
                }
              )
                .wait(10) // need to wait for the image dimensions to stabalize or getBoundingClientRect will return all zeros
                .get('img')
                .then(($image) => {
                  verifyDimensions(
                    $image.get(0).getBoundingClientRect(),
                    expected
                  );
                });
            });
          }
        );
      });
    });
  });
});
