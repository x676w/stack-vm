import { Node } from "@babel/types";
import { SVArrayExpression, SVBinaryExpression, SVBinaryOperator, SVLiteral, SVLogicalExpression, SVLogicalOperator, SVNode, SVUnaryExpression, SVUnaryOperator } from "./nodes";
import { parseCode } from "../utils";

export type TNodesRoot = SVNode[];

class Parser {
  private nodesRoot: TNodesRoot;

  constructor() {
    this.nodesRoot = [];
  };

  private scanNode(node: Node, isForRoot = true): SVNode | undefined {
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
        const left = this.scanNode(node.left, false)!;
        const right = this.scanNode(node.right, false)!;
        const operator = node.operator as SVBinaryOperator;

        svNode = new SVBinaryExpression(left, right, operator);

        break;
      };

      case "LogicalExpression": {
        const left = this.scanNode(node.left, false)!;
        const right = this.scanNode(node.right, false)!;
        const operator = node.operator as SVLogicalOperator;

        svNode = new SVLogicalExpression(left, right, operator);

        break;
      };

      case "UnaryExpression": {
        const arg = this.scanNode(node.argument, false)!;
        const operator = node.operator as SVUnaryOperator;

        svNode = new SVUnaryExpression(arg, operator);
        
        break;
      };

      case "ArrayExpression": {
        const nodeElements = [];
        const elements = node.elements.reverse();

        for(const element of elements) {
          const node = this.scanNode(element as Node, false)!;

          nodeElements.push(node);
        };

        svNode = new SVArrayExpression(nodeElements);
        
        break;
      };

      case "ExpressionStatement": {
        svNode = this.scanNode(node.expression, false);

        break;
      };
    };

    if(svNode !== undefined && isForRoot) {
      this.nodesRoot.push(svNode);
    };

    return svNode;
  };

  public parse(code: string) {
    const tree = parseCode(code);

    for(const node of tree.program.body) {
      this.scanNode(node);
    };

    return this.nodesRoot;
  };
};

export default Parser;