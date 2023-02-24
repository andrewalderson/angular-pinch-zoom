import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[apzImage]',
  standalone: true,
})
export class ApzImageDirective {
  @HostBinding('class') readonly _hostClasses = 'apz-image';
}
