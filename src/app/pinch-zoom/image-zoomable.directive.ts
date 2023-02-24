import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[apzImage][zoomable]',
  standalone: true,
})
export class ApzImageZoomableDirective {
  @HostBinding('class') readonly _hostClasses = 'apz-image--zoomable';
}
