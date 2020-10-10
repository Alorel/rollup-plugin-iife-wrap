import {Arrayish} from '@alorel/commons-array-types';
import {OutputAsset, RenderedChunk} from 'rollup';

export type IifeWrapDualVar = [string, string];
export type IifeWrapVar = string | IifeWrapDualVar;

export interface IifeWrapPluginOpts {
  /**
   * Minimum number of occurrences required
   * @default 2
   */
  minOccurrences?: number;

  sourceMap?: boolean;

  /**
   * If you use SSR, check if these vars exist before injecting them:
   *
   * <code>(function(myVar) {...})(typeof myVar === 'undefined' ? undefined : myVar);</code>
   *
   * Set to an empty array if you don't need these checks
   * @default See {@link DEFAULT_IIFE_WRAP_SSR_VARS}
   */
  ssrAwareVars?: Arrayish<string>;

  //tslint:disable:max-line-length
  /**
   * Variable names to consider. Each element can be a string or a
   * [string, string] tuple where the 1st element will be at the top
   * of the function while 2nd will be at the bottom, e.g. the setup of
   * <code>['Object', ['foo', "typeof foo === 'undefined' ? {} : foo"]]</code>
   * would result in
   * <code>
   *   (function(Object, foo) {...})(Object, typeof foo === 'undefined' ? {} : foo)
   * </code>
   * @default See {@link DEFAULT_IIFE_WRAP_VARS}
   */
  vars?: Arrayish<IifeWrapVar>;

  //tslint:enable:max-line-length

  /** If provided, assets this function returns true for will also be processed */
  includeAssets?(asset: OutputAsset): boolean;

  /** Process chunks this function returns true for. Processes all chunks by default. */
  includeChunks?(chunk: RenderedChunk): boolean;
}
