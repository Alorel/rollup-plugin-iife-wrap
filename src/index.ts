import {Program} from 'estree';
import {OutputPlugin, PluginContext} from 'rollup';
import {DEFAULT_IIFE_WRAP_VARS} from './DEFAULT_IIFE_WRAP_VARS';
import {IifeWrapDualVar, IifeWrapPluginOpts, IifeWrapVar} from './IifeWrapPluginOpts';
import {doWrap} from './lib/doWrap';
import {filterVarsForOccurrence} from './lib/filterVarsForOccurrence';
import {inlineSourceMap} from './lib/inlineSourceMap';
import {mapIifeVar} from './lib/mapIifeVar';
import {stubTrue} from './lib/stub';

function iifeWrapPlugin(pluginOpts: IifeWrapPluginOpts = {}): OutputPlugin {
  const {
    minOccurrences = 2, //tslint:disable-line:no-magic-numbers
    vars = DEFAULT_IIFE_WRAP_VARS,
    includeAssets,
    includeChunks = stubTrue,
    sourceMap = false
  } = pluginOpts;

  if (!vars.length) {
    throw new Error('At least one variable required');
  }

  const mappedVars: IifeWrapDualVar[] = vars.map(mapIifeVar);

  function run(ctx: PluginContext, code: string): null | ReturnType<typeof doWrap> {
    // Need to pass undefined as an option - typings have the arg as required
    const ast = ctx.parse(code, undefined) as any as Program;
    const filteredVars = filterVarsForOccurrence(ast, mappedVars, minOccurrences);
    if (!filteredVars.length) {
      return null;
    }

    return doWrap(code, filteredVars, sourceMap);
  }

  const returnPlugin: OutputPlugin = {
    name: 'iife-wrap-plugin',
    renderChunk(this: PluginContext, code, chunk) {
      return includeChunks(chunk) ?
        run(this, code) :
        null;
    }
  };
  if (includeAssets) {
    returnPlugin.generateBundle = function (this: PluginContext, _o, bundle) {
      const emittables = Object.values(bundle);

      for (const asset of emittables) {
        if (asset.type === 'asset' && includeAssets(asset)) {
          const result = run(this, asset.source.toString());
          if (result) {
            let newSource = result.code;
            if (sourceMap && !newSource.includes('sourceMappingURL=')) {
              newSource = `${newSource.trimEnd()}\n//# sourceMappingURL=${inlineSourceMap(result.map)}`;
            }
            asset.source = newSource;
          }
        }
      }
    };
  }

  return returnPlugin;
}

export {
  DEFAULT_IIFE_WRAP_VARS,
  IifeWrapPluginOpts,
  IifeWrapDualVar,
  IifeWrapVar,
  iifeWrapPlugin
};
