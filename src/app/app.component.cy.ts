import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AppComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('should have a zoomable img', () => {
    cy.mount(AppComponent).get('img[apzImage][zoomable]').should('exist');
  });
});
