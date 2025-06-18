import { Node } from "@babel/types";
import { SVLiteral, SVNode } from "./nodes";
import { parse } from "@babel/parser";

export type TNodesRoot = SVNode[];

class Parser {
  private nodesRoot: TNodesRoot;

  constructor() {
    this.nodesRoot = [];
  };

  private scanNode(node: Node) {
    let svNode: SVNode | undefined;
    
    switch(node.type) {
      case "StringLiteral":
        svNode = new SVLiteral("string", node.value);
        break;
      case "NumericLiteral":
        svNode = new SVLiteral("number", node.value);
        break;
      case "BooleanLiteral":
        svNode = new SVLiteral("boolean", node.value);
        break;
    };

    if(svNode !== undefined) {
      this.nodesRoot.push(svNode);
    };
  };

  public parse(code: string) {
    const tree = parse(code);

    for(const node of tree.program.body) {
      this.scanNode(node);
    };

    return this.nodesRoot;
  };
};

export default Parser;