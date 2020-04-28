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

  //tslint:disable:max-line-length
  /**
   * Variable names to consider. Each element can be a string or a
   * [string, string] tuple where the 1st element will be at the top
   * of the function while 2nd will be at the bottom, e.g. the setup of
   * <code>['Object', ['window', "typeof window === 'undefined' ? {} : window"]]</code>
   * would result in
   * <code>
   *   (function(Object, window) {})(Object, typeof window === 'undefined' ? {} : window)
   * </code>
   * @default <code>['Object', 'Array', 'Promise', 'Symbol', 'JSON', 'document', ['window', 'typeof window === \'undefined\' ? undefined : window'], 'location', 'Error', 'TypeError']</code>
   */
  vars?: IifeWrapVar[] | ReadonlyArray<IifeWrapVar>;

  //tslint:enable:max-line-length

  /** If provided, assets this function returns true for will also be processed */
  includeAssets?(asset: OutputAsset): boolean;

  /** Process chunks this function returns true for. Processes all chunks by default. */
  includeChunks?(chunk: RenderedChunk): boolean;
}
