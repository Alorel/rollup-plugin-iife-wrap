import {Identifier, Program} from 'estree';
import {walk, WalkContext} from 'estree-walker';
import {IifeWrapDualVar} from '../IifeWrapPluginOpts';
import {noop} from './stub';

const varsToMap: (vars: IifeWrapDualVar[]) => Map<IifeWrapDualVar, number> = (() => {
  function varsToMapReducer(acc: Map<IifeWrapDualVar, number>, v: IifeWrapDualVar): Map<IifeWrapDualVar, number> {
    acc.set(v, 0);

    return acc;
  }

  return function varsToMapInner(vars: IifeWrapDualVar[]): Map<IifeWrapDualVar, number> {
    return vars.reduce(varsToMapReducer, new Map());
  };
})();

/** @internal */
export function filterVarsForOccurrence(
  ast: Program,
  vars: IifeWrapDualVar[],
  minOccurrences: number
): IifeWrapDualVar[] {
  const counts = varsToMap(vars);
  let foundAll = false;

  walk(ast, {
    enter(this: WalkContext, node): void {
      // Already found all the nodes we need - skip
      if (foundAll) {
        this.skip();

        return;
      }

      /** How many of the variables were skipped because >= minOccurrences have been found */
      let skipped = 0;

      for (const v of vars) {
        const varCount = counts.get(v)!;

        // Already found the number we need
        if (varCount >= minOccurrences) {
          // And if we skipped all the vars we can skip the rest of the tree
          if (++skipped >= counts.size) {
            foundAll = true;
            break;
          }
          continue;
        }

        // If the var name matches, increment the count
        if ((node as Identifier).name === v[0]) {
          counts.set(v, varCount + 1);
        }
      }
    },
    leave: noop
  });

  return foundAll ?
    vars :
    Array.from(counts.entries())
      .reduce<IifeWrapDualVar[]>(
        (acc, [dualVar, count]) => {
          if (count >= minOccurrences) {
            acc.push(dualVar);
          }

          return acc;
        },
        []
      );
}
