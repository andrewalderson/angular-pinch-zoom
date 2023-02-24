export const imageDimensions = [
  {
    reason: 'the image and parent are square and the same size as its parent',
    parentWidth: 1200,
    parentHeight: 1200,
    imageWidth: 1200,
    imageHeight: 1200,
  },
  {
    reason:
      'the image and parent are square and the image is greater its parent',
    parentWidth: 1200,
    parentHeight: 1200,
    imageWidth: 1600,
    imageHeight: 1600,
  },
  {
    reason:
      'the image and parent are square and the image is smaller its parent',
    parentWidth: 1200,
    parentHeight: 1200,
    imageWidth: 1000,
    imageHeight: 1000,
  },
  {
    reason:
      'the image is larger than its parent and the image width is greater than its height that the parent height is greater than its width',
    parentWidth: 840,
    parentHeight: 960,
    imageWidth: 1200,
    imageHeight: 1040,
  },
  {
    reason:
      'the image is larger that its parent and the image height is greater than its width and the parent width is greater than its height',
    parentWidth: 840,
    parentHeight: 960,
    imageWidth: 1040,
    imageHeight: 1200,
  },
  {
    reason:
      'the image is larger than its parent and the image width is greater than its height that the parent height is greater than its width',
    parentWidth: 960,
    parentHeight: 840,
    imageWidth: 1200,
    imageHeight: 1040,
  },
  {
    reason:
      'the image is larger than its parent and the image height is greater than its width that the parent height is greater than its width',
    parentWidth: 960,
    parentHeight: 840,
    imageWidth: 1040,
    imageHeight: 1200,
  },
  {
    reason:
      'the image is smaller than its parent and the image width is greater than its height that the parent height is greater than its width',
    parentWidth: 840,
    parentHeight: 960,
    imageWidth: 720,
    imageHeight: 680,
  },
  {
    reason:
      'the image is smaller that its parent and the image height is greater than its width and the parent width is greater than its height',
    parentWidth: 840,
    parentHeight: 960,
    imageWidth: 680,
    imageHeight: 720,
  },
  {
    reason:
      'the image is smaller than its parent and the image width is greater than its height that the parent height is greater than its width',
    parentWidth: 960,
    parentHeight: 840,
    imageWidth: 720,
    imageHeight: 680,
  },
  {
    reason:
      'the image is smaller than its parent and the image height is greater than its width that the parent height is greater than its width',
    parentWidth: 960,
    parentHeight: 840,
    imageWidth: 680,
    imageHeight: 720,
  },
];

export const objectFitNoneDimensions = {
  type: { objectFit: 'none', description: 'center the image without scaling' },
  dimensions: imageDimensions.map((item) => {
    return {
      ...item,
      expected: {
        x: (item.parentWidth - item.imageWidth) / 2,
        y: (item.parentHeight - item.imageHeight) / 2,
        width: item.imageWidth,
        height: item.imageHeight,
      },
    };
  }),
};

export const objectFitContainDimensions = {
  type: {
    objectFit: 'contain',
    description: 'contain the image in its parent with no overflow',
  },
  dimensions: imageDimensions.map((item) => {
    const scale = Math.min(
      item.parentWidth / item.imageWidth,
      item.parentHeight / item.imageHeight
    );
    return {
      ...item,
      expected: {
        x: (item.parentWidth - item.imageWidth * scale) / 2,
        y: (item.parentHeight - item.imageHeight * scale) / 2,
        width: item.imageWidth * scale,
        height: item.imageHeight * scale,
      },
    };
  }),
};

export const objectFitCoverDimensions = {
  type: {
    objectFit: 'cover',
    description:
      'cover the container with the image with overflow in one dimension if needed',
  },
  dimensions: imageDimensions.map((item) => {
    const scale = Math.max(
      item.parentWidth / item.imageWidth,
      item.parentHeight / item.imageHeight
    );
    return {
      ...item,
      expected: {
        x: (item.parentWidth - item.imageWidth * scale) / 2,
        y: (item.parentHeight - item.imageHeight * scale) / 2,
        width: item.imageWidth * scale,
        height: item.imageHeight * scale,
      },
    };
  }),
};

export const allObjectFits = [
  objectFitNoneDimensions,
  objectFitContainDimensions,
  objectFitCoverDimensions,
];
