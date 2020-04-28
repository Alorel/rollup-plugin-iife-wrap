declare module 'estree-walker' {
  interface WalkContext {
    replace(newNode: any): void;

    skip(): void;
  }

  export type WalkFunction = (
    this: WalkContext,
    node: import('estree').BaseNode,
    parent?: null | import('estree').BaseNode,
    prop?: number | string,
    index?: number | string
  ) => void;

  export interface Walker {
    enter: WalkFunction;

    leave: WalkFunction;
  }

  export function walk(tree: import('estree').BaseNode, walker: Walker): void;
}
