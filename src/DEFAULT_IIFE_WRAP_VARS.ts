import {IifeWrapDualVar} from './IifeWrapPluginOpts';

/** Default "vars" option value */
export const DEFAULT_IIFE_WRAP_VARS: ReadonlyArray<string | Readonly<IifeWrapDualVar>> = Object.freeze([
  'Object',
  'Array',
  'Promise',
  'Symbol',
  'JSON',
  'document',
  Object.freeze(['window', 'typeof window === \'undefined\' ? undefined : window']) as Readonly<IifeWrapDualVar>,
  'location',
  'Error',
  'TypeError'
]);
