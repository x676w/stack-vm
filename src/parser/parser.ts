import { Node } from "@babel/types";
import { SVBinaryExpression, SVBinaryOperator, SVLiteral, SVLogicalExpression, SVLogicalOperator, SVNode } from "./nodes";
import { parse } from "@babel/parser";

export type TNodesRoot = SVNode[];

class Parser {
  private nodesRoot: TNodesRoot;

  constructor() {
    this.nodesRoot = [];
  };

  private scanNode(node: Node): SVNode | undefined {
    let svNode: SVNode | undefined;
    
    switch(node.type) {
      case "StringLiteral": {
        svNode = new SVLiteral("string", node.value);

        break;
      };

      case "NumericLiteral": {
        svNode = new SVLiteral("number", node.value);

        break;
      };

      case "BooleanLiteral": {
        svNode = new SVLiteral("boolean", node.value);

        break;
      };

      case "BinaryExpression": {
        const left = this.scanNode(node.left)!;
        const right = this.scanNode(node.right)!;
        const operator = node.operator as SVBinaryOperator;

        svNode = new SVBinaryExpression(left, right, operator);

        break;
      };

      case "LogicalExpression": {
        const left = this.scanNode(node.left)!;
        const right = this.scanNode(node.right)!;
        const operator = node.operator as SVLogicalOperator;

        svNode = new SVLogicalExpression(left, right, operator);

        break;
      };

      case "ExpressionStatement": {
        this.scanNode(node.expression);

        break;
      };
    };

    if(svNode !== undefined) {
      this.nodesRoot.push(svNode);
    };

    return svNode;
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