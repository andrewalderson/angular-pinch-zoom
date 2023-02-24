import { ApzImageZoomableDirective } from './image-zoomable.directive';
import { ApzImageDirective } from './image.directive';

describe(ApzImageDirective.name, () => {
  it("should add the class 'apz-image--zoomable' to the img element", () => {
    cy.mount('<img apzImage zoomable/>', {
      imports: [ApzImageDirective, ApzImageZoomableDirective],
    });

    cy.get('img').should('have.class', 'apz-image--zoomable');
  });
});
