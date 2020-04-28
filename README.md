# rollup-plugin-iife-wrap

Wraps your output chunks in an iife with some globals for better minification..

-----

# Installation

[Configure npm for GitHub packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)
then install `@alorel/rollup-plugin-iife-wrap`

# Example

```javascript
import {iifeWrapPlugin} from '@alorel/rollup-plugin-iife-wrap';

export default {
  // ... your default options
  output: {
    // It can function as an output plugin
    plugins: [
      iifeWrapPlugin()
    ]
  },
  // Or as a regular plugin
  plugins: [
    iifeWrapPlugin()
  ]
}
```

# API

```typescript
import { OutputAsset, OutputPlugin, RenderedChunk } from 'rollup';

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
  vars?: IifeWrapVar[];

  //tslint:enable:max-line-length

  /** If provided, assets this function returns true for will also be processed */
  includeAssets?(asset: OutputAsset): boolean;

  /** Process chunks this function returns true for. Processes all chunks by default. */
  includeChunks?(chunk: RenderedChunk): boolean;
}

export function iifeWrapPlugin(pluginOpts?: IifeWrapPluginOpts): OutputPlugin;
```