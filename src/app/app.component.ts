import { Component } from '@angular/core';
import { ApzImageZoomableDirective } from './image/image-zoomable.directive';
import { ApzImageDirective } from './image/image.directive';

@Component({
  standalone: true,
  selector: 'apz-root',
  imports: [ApzImageDirective, ApzImageZoomableDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  src = 'https://source.unsplash.com/600x600';
}
