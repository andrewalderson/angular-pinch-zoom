import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';
import { ApzImageZoomableDirective } from './pinch-zoom/image-zoomable.directive';
import { ApzImageDirective } from './pinch-zoom/image.directive';

@Component({
  standalone: true,
  selector: 'apz-root',
  imports: [ApzImageDirective, ApzImageZoomableDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  src = faker.image.unsplash.image(600, 600);
}
