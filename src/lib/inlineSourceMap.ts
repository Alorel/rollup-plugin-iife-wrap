/** @internal */
export function inlineSourceMap(srcMap: any): string {
  const json = JSON.stringify(srcMap);
  const base64 = Buffer.from(json, 'utf8').toString('base64');

  return `//# sourceMappingURL=data:application/json;base64,${base64}\n`;
}
