/** @internal */
export function head<T>(inp: T[]): T {
  return inp[0];
}

/** @internal */
export function last<T>(inp: T[]): T {
  return inp[inp.length - 1];
}
