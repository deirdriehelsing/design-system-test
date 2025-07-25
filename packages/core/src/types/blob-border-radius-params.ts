interface BlobBorderRadiusParams {
  /**
   * Whether or not the border radius should be animated. Defaults to false.
   **/
  animated?: boolean;
  /**
   * The duration of the animation in milliseconds. Defaults to 7000.
   **/
  animationDuration?: number;
  /**
   * A tuple of eight numbers, with a value from 0 to 1 that each generated corner radius will be
   * multiplied against. If not specified, cornerWeight will default to 1.
   **/
  cornerWeight?: number[];
  /**
   * A tuple of two numbers that represent the min and max range of the generated corner radius
   * before being multiplied by the corner weight. Defaults to [12, 48].
   **/
  range?: number[];
}

export type { BlobBorderRadiusParams };
