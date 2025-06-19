import { assert } from "../utils";

export type SVBinaryOperator = "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "<"
  | "<="
  | ">"
  | ">="
  | "=="
  | "==="
  | "!="
  | "!=="
  | "<<"
  | ">>"
  | ">>>"
  | "^"
  | "|"
  | "&";

export type SVLogicalOperator = "||"
  | "&&";

export type SVUnaryOperator = "+"
  | "-"
  | "!"
  | "~"
  | "typeof";

export type SVNodeType = "Literal"
  | "BinaryExpression"
  | "LogicalExpression"
  | "UnaryExpression";

export class SVNode {
  public nodeType: SVNodeType;

  constructor(type: SVNodeType) {
    this.nodeType = type;
  };
};

export class SVLiteral extends SVNode {
  public value: any;

  constructor(valueType: "string" | "number" | "boolean", value: any) {
    super("Literal");

    switch(valueType) {
      case "string":
        assert(typeof value === "string", "The value of a string literal node must be of type string");
        break;
      case "number":
        assert(typeof value === "number", "The value of a numeric literal node must be of type number");
        break;
      case "boolean":
        assert(typeof value === "boolean", "The value of a boolean literal node must be of type boolean");
        break;
    };

    this.value = value;
  };
};

export class SVBinaryExpression extends SVNode {
  public left: SVNode;
  public right: SVNode;
  public operator: SVBinaryOperator;

  constructor(left: SVNode, right: SVNode, operator: SVBinaryOperator) {
    super("BinaryExpression");

    this.left = left;
    this.right = right;
    this.operator = operator;
  };
};

export class SVLogicalExpression extends SVNode {
  public left: SVNode;
  public right: SVNode;
  public operator: SVLogicalOperator;

  constructor(left: SVNode, right: SVNode, operator: SVLogicalOperator) {
    super("LogicalExpression");

    this.left = left;
    this.right = right;
    this.operator = operator;
  };
};

export class SVUnaryExpression extends SVNode {
  public arg: SVNode;
  public operator: SVUnaryOperator;

  constructor(arg: SVNode, operator: SVUnaryOperator) {
    super("UnaryExpression");

    this.arg = arg;
    this.operator = operator;
  };
};