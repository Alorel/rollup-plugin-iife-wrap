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
    minOccurrences?: number;
    vars?: IifeWrapVar[];
    sourceMap?: boolean;
    includeAssets?(asset: OutputAsset): boolean;
    includeChunks?(chunk: RenderedChunk): boolean;
}

export function iifeWrapPlugin(pluginOpts?: IifeWrapPluginOpts): OutputPlugin;
```
