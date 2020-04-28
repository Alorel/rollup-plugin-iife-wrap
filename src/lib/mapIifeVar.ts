import {IifeWrapDualVar, IifeWrapVar} from '../IifeWrapPluginOpts';

/** @internal */
export function mapIifeVar(v: IifeWrapVar): IifeWrapDualVar {
  return typeof v === 'string' ? [v, v] : v;
}
