import { parse } from "@babel/parser";

export function assert(condition: any, message: string) {
  if(!condition) {
    throw new Error(message);
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

export function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
};