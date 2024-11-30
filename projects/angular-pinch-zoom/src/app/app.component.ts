import { Component } from "@angular/core";
import { ApzImageZoomableDirective } from "./image/image-zoomable.directive";
import { ApzImageDirective } from "./image/image.directive";

@Component({
  selector: "ama-root",
  standalone: true,
  imports: [ApzImageDirective, ApzImageZoomableDirective],
  template: `<div class="image-wrapper">
    <img apzImage zoomable [src]="src" alt="Image to zoom" />
  </div> `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .image-wrapper {
        width: 100%;
        height: 100%;
        max-width: 400px;
        max-height: 600px;
        position: relative;
      }

      img[apzImage] {
        position: absolute;
        transition: transform linear 0.125s;
        touch-action: none;
      }
    `,
  ],
})
export class AppComponent {
  src = "/assets/jigar-panchal-PMe9O1ZzOjo-unsplash.jpg";
}
