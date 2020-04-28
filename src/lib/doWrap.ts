import MagicString from 'magic-string';
import {SourceMapInput} from 'rollup';
import {IifeWrapDualVar} from '../IifeWrapPluginOpts';
import {head, last} from './arrayUtils';

/** @internal */
export function doWrap(
  code: string,
  vars: IifeWrapDualVar[],
  sourceMap: boolean
): { code: string; map: SourceMapInput } {
  const ms = new MagicString(code);
  ms.append(`\n})(${vars.map(last).join(',')});`)
    .prepend(`(function(${vars.map(head).join(',')}){\n`);

  return {
    code: ms.toString(),
    map: sourceMap ?
      ms.generateMap({hires: true}) :
      {mappings: ''}
  };
}
