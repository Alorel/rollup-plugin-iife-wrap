/** Default "vars" option value */
export const DEFAULT_IIFE_WRAP_VARS: ReadonlyArray<string> = Object.freeze([
  'Object',
  'Array',
  'Promise',
  'Symbol',
  'JSON',
  'document',
  'window',
  'location',
  'Error',
  'localStorage',
  'sessionStorage',
  'encodeURI',
  'encodeURIComponent',
  'TypeError'
]);
