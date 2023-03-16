import {
  coerceElement,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { isNumber, isPositiveNumber, ObjectFit } from './types';

@Directive({
  selector: '[apzImage]',
  standalone: true,
})
export class ApzImageDirective implements OnChanges {
  @HostBinding('class') readonly _hostClasses = 'apz-image';

  #elementRef = inject(ElementRef<HTMLElement>);

  _matrix = new DOMMatrixReadOnly();

  /**
   * The algorithm used to scale and position the image
   * 'none' will center the image but keep its original size
   * 'contain' will scale the image to fit in its container with no overflow. One dimension may be smaller than the container
   * 'cover' will scale the image to fit in its container with overflow if necessary. One dimension may be larger than the container
   */
  @Input() objectFit: ObjectFit = 'none';

  /**
   * The percentage as a number between 0 and 1
   * for each step of a zoom (scale) operation
   * Passing in 0 would mean that there would be no zooming
   * Defaults to 0.1
   */
  @Input() get scaleStep(): number {
    return this.#scaleStep;
  }
  set scaleStep(value: NumberInput) {
    const step = coerceNumberProperty(value);
    if (isNumber(step)) {
      this.#scaleStep = Math.min(Math.max(step, 0), 1);
    }
  }
  #scaleStep = 0.1;

  @HostListener('load') onLoad() {
    this.#fitImage(this.objectFit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const objectFit = 'objectFit';
    // the 'onLoad' listener will handle the first change
    if (objectFit in changes && !changes[objectFit].isFirstChange()) {
      this.#fitImage(changes[objectFit].currentValue);
    }
  }

  #fitImage(fit: ObjectFit) {
    switch (fit) {
      case 'contain':
        return this.contain();
      case 'cover':
        return this.cover();
      case 'none':
        return this.center();
      default: {
        const _exhaustiveCheck: never = fit;
        return _exhaustiveCheck;
      }
    }
  }

  /**
   * Scales the image to fit within the bounds of its container
   * with no overflow. One dimension may be smaller than the container
   */
  contain() {
    const { x, y, width, height } = this.getImageBoundsInParent();
    const scale = Math.min(width, height);

    this.setTransform(new DOMMatrixReadOnly([scale, 0, 0, scale, x, y]));
  }

  /**
   * Scales the image to fit within the bounds of its container
   * with overflow. One dimension may be larger than the container
   */
  cover() {
    const { x, y, width, height } = this.getImageBoundsInParent();
    const scale = Math.max(width, height);

    this.setTransform(new DOMMatrixReadOnly([scale, 0, 0, scale, x, y]));
  }

  /**
   * Resets the image scale to full size and centers it
   */
  center() {
    const { x, y } = this.getImageBoundsInParent();

    this.setTransform(new DOMMatrixReadOnly([1, 0, 0, 1, x, y]));
  }

  /**
   * Zooms the image in an out
   * @param scale an number between -1 and 1. Negative to zoom out and position to zoom in
   */
  zoom(scale: number) {
    if (scale === 0) {
      return;
    }

    // don't use Math.sign here becuase for trackpad scrolling the scale value
    // will be a fraction of 1 or -1
    // for trackpad we want a slower scaling in and out
    scale = Math.min(Math.max(scale, -1), 1);
    scale = scale * this.scaleStep;

    if (scale < 0) {
      scale = 1 / (1 - scale);
    } else {
      scale += 1;
    }

    return this.scale(scale);
  }

  protected getImageBoundsInParent() {
    const element = coerceElement(this.#elementRef) as HTMLImageElement;
    const parentElement = element.parentElement;
    if (!parentElement) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    const { width: parentWidth, height: parentHeight } =
      parentElement.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = element;

    const x = (parentWidth - naturalWidth) / 2;
    const y = (parentHeight - naturalHeight) / 2;

    const width = parentWidth / naturalWidth;
    const height = parentHeight / naturalHeight;

    // prevent 'NaN' and 'Infinity' values if element dimensions are 0
    return new DOMRect(
      isNumber(x) ? x : 0,
      isNumber(y) ? y : 0,
      isPositiveNumber(width) ? width : 0,
      isPositiveNumber(height) ? height : 0
    );
  }

  protected scale(x: number, y: number = x) {
    return this.transform(x, 0, 0, y, 0, 0);
  }

  protected transform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) {
    const matrix = this._matrix.multiply(new DOMMatrix([a, b, c, d, e, f]));
    return this.setTransform(matrix);
  }

  protected setTransform(matrix: DOMMatrixReadOnly) {
    const element = coerceElement(this.#elementRef);
    element.style.transform = matrix.toString();
    this._matrix = matrix;
  }
}
