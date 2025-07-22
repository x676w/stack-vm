import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import type { File } from "@babel/types";

export function assert(condition: any, message: string) {
  if(!condition) {
    throw new Error("Assertion failed: " + message);
  };
};

export function random(min: number, max: number) {
  return min + Math.round(Math.random() * (max - min));
};

export function parseCode(code: string) {
  const tree = parse(code, {
    attachComment: false,
    sourceType: 'unambiguous'
  });

  return tree;
};

export function getGlobals(tree: File): Set<string> {
  const globals = new Set<string>();

  traverse.default(tree, {
    Identifier(path) {
      if(path.scope.hasGlobal(path.node.name) && !globals.has(path.node.name)) {
        globals.add(path.node.name);
      }
    }
  });

  return globals;
};

export function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
};