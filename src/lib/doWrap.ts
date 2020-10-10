import MagicString from 'magic-string';
import {SourceDescription} from 'rollup';
import {IifeWrapDualVar} from '../IifeWrapPluginOpts';
import {head, last} from './arrayUtils';

/** @internal */
export function doWrap(
  code: string,
  vars: IifeWrapDualVar[],
  sourceMap: boolean
): SourceDescription {
  const ms = new MagicString(code)
    .append(`\n})(${vars.map(last).join(',')});`)
    .prepend(`(function(${vars.map(head).join(',')}){\n`);

  return {
    code: ms.toString(),
    map: sourceMap ?
      ms.generateMap({hires: true}) :
      {mappings: ''}
  };
}
