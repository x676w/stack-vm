import type { Node } from "@babel/types";
import SVCompiler from "./compiler.js";

export default class JMPLabel {
  public body: any[];

  constructor() {
    this.body  = [];
  };

  public init(compiler: SVCompiler, node: Node) {
    const body = compiler.compileNodes(node);

    this.body  = body;
  };

  public getPointers(program: any[]) {
    const entry = program.length;
    const exit  = program.length + this.body.length;
    
    return { entry, exit };
  };

  public link(program: any[]) {
    return [...program, ...this.body];
  };
};