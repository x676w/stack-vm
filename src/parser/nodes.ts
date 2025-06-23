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
  | "UnaryExpression"
  | "ArrayExpression"
  | "CallExpression"
  | "MemberExpression"
  | "Identifier"
  | "VariableDefinition";

export type SVVariableDefinitionType = {
  name: string,
  constant: boolean,
  value: SVNode | undefined
}

  
export class SVScopeDefinition {
  public id: number;
  public constant: boolean;
  public scope: SVScope;
  
  constructor(id: number, constant: boolean, scope: SVScope) {
    this.id = id;
    this.constant = constant;
    this.scope = scope;
  };
};

export class SVScope {
  public id: number;
  public parent: SVScope | null;
  public variables: Map<string, SVScopeDefinition>;
  
  constructor(id: number, parent?: SVScope) {
    this.id = id;
    this.parent = parent ?? null;
    this.variables = new Map();
  };

  public hasVariable(name: string): boolean {
    return this.variables.has(name);
  };

  public hasVariableInParentRoot(name: string) {
    return this.variables.has(name) || !!(this.parent && this.parent.hasVariable(name));;
  };

  public getVariable(name: string) {
    const definition = this.variables.get(name);

    assert(definition, name + " is not defined.");

    return definition!;
  };

  public getVariableInParentRoot(name: string): SVScopeDefinition {
    if(this.hasVariable(name))
      return this.getVariable(name);
    else if(this.parent)
      return this.parent.getVariableInParentRoot(name);
    else
      throw new Error(name + " is not defined.");
  };

  public defineVariable(name: string, constant: boolean) {
    const isDefined = this.variables.has(name);

    assert(!isDefined, name + " is already defined.");

    const definition = new SVScopeDefinition(
      this.variables.size, constant, this
    );

    this.variables.set(name, definition);

    return definition;
  };
};

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

export class SVArrayExpression extends SVNode {
  public elements: SVNode[];
  
  constructor(elements: SVNode[]) {
    super("ArrayExpression");

    this.elements = elements;
  };
};

export class SVCallExpression extends SVNode {
  public callee: SVNode;
  public args: SVNode[];

  constructor(callee: SVNode, args: SVNode[]) {
    super("CallExpression");

    this.callee = callee;
    this.args = args;
  };
};

export class SVMemberExpression extends SVNode {
  public object: SVNode;
  public property: SVNode;
  
  constructor(object: SVNode, property: SVNode) {
    super("MemberExpression");

    this.object = object;
    this.property = property;
  };
};

export class SVIdentifier extends SVNode {
  public name: string;
  public isGlobal: boolean;

  constructor(name: string, isGlobal: boolean) {
    super("Identifier");

    this.name = name;
    this.isGlobal = isGlobal;
  };
};

export class SVVariableDefinition extends SVNode {
  public variables: SVVariableDefinitionType[];
  
  constructor(variables: SVVariableDefinitionType[]) {
    super("VariableDefinition");

    this.variables = variables;
  };
};