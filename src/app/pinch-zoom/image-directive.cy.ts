import { ApzImageDirective } from './image.directive';

describe(ApzImageDirective.name, () => {
  it("should add the class 'apz-image' to the img element", () => {
    cy.mount('<img apzImage />', {
      imports: [ApzImageDirective],
    });

    cy.get('img').should('have.class', 'apz-image');
  });
});
