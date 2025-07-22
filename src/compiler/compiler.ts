import * as types from "@babel/types";
import opcodes, { type IOperationCode } from "../opcodes.js";
import { SVScope } from "./scope.js";
import { getGlobals, parseCode } from "../utils.js";

class Compiler {
  private program      : number[];
  private currentScope : SVScope;
  private globals      : Set<string>;

  public usedOpcodes   : number[];

  constructor() {
    this.program      = [];
    this.currentScope = new SVScope(0);
    this.globals      = new Set();

    this.usedOpcodes  = [];
  };

  private enterNewScope() {
    const parent = this.currentScope;

    const newScope = new SVScope(parent.id + 1, parent);

    this.currentScope = newScope;
  };

  private exitScope() {
    const outerScope = this.currentScope.parent!;

    this.currentScope = outerScope;
  };

  private writeInstruction(instruction: any) {
    this.program.push(instruction);
  };

  private writeOp(op: IOperationCode) {
    this.writeInstruction(op.instruction);

    if(!this.usedOpcodes.includes(op.instruction)) {
      this.usedOpcodes.push(op.instruction);

      console.log(
        `Used [${op.name}] (${op.instruction})`
      );
    };
  };

  private walkNode(node: types.Node) {
    switch(node.type) {
      case "StringLiteral":
      case "NumericLiteral":
      case "BooleanLiteral": {
        this.writeOp(opcodes.STACK_PUSH);
        this.writeInstruction(node.value);

        break;
      };

      case "NullLiteral": {
        this.writeOp(opcodes.STACK_PUSH);
        this.writeInstruction(null);
        
        break;
      };

      case "BinaryExpression": {
        this.walkNode(node.left);
        this.walkNode(node.right);

        switch(node.operator) {
          case "+":
            this.writeOp(opcodes.BINARY_ADD);
            break;
          case "-":
            this.writeOp(opcodes.BINARY_SUB);
            break;
          case "*":
            this.writeOp(opcodes.BINARY_MUL);
            break;
          case "/":
            this.writeOp(opcodes.BINARY_DIV);
            break;
          case "%":
            this.writeOp(opcodes.BINARY_MOD);
            break;
          case "<":
            this.writeOp(opcodes.BINARY_LESS);
            break;
          case "<=":
            this.writeOp(opcodes.BINARY_LESS_OR_EQUAL);
            break;
          case ">":
            this.writeOp(opcodes.BINARY_GREATER);
            break;
          case ">=":
            this.writeOp(opcodes.BINARY_GREATER_OR_EQUAL);
            break;
          case "==":
            this.writeOp(opcodes.BINARY_EQUAL);
            break;
          case "===":
            this.writeOp(opcodes.BINARY_STRICT_EQUAL);
            break;
          case "!=":
            this.writeOp(opcodes.BINARY_NOT_EQUAL);
            break;
          case "!==":
            this.writeOp(opcodes.BINARY_STRICT_NOT_EQUAL);
            break;
          case "<<":
            this.writeOp(opcodes.BINARY_BIT_SHIFT_LEFT);
            break;
          case ">>":
            this.writeOp(opcodes.BINARY_BIT_SHIFT_RIGHT);
            break;
          case ">>>":
            this.writeOp(opcodes.BINARY_BIT_SHIFT_RIGHT_UNSIGNED);
            break;
          case "^":
            this.writeOp(opcodes.BINARY_BIT_XOR);
            break;
          case "|":
            this.writeOp(opcodes.BINARY_BIT_OR);
            break;
          case "&":
            this.writeOp(opcodes.BINARY_BIT_AND);
            break;
        };
        
        break;
      };

      case "UnaryExpression": {
        this.walkNode(node.argument);
        
        switch(node.operator) {
          case "+":
            this.writeOp(opcodes.UNARY_PLUS);
            break;
          case "-":
            this.writeOp(opcodes.UNARY_MINUS);
            break;
          case "!":
            this.writeOp(opcodes.UNARY_NOT);
            break;
          case "~":
            this.writeOp(opcodes.UNARY_BIT_NOT);
            break;
        };
        
        break;
      };

      case "ArrayExpression": {
        for(const element of node.elements) {
          this.walkNode(element as types.Node);
        };

        this.writeOp(opcodes.BUILD_ARRAY);
        this.writeInstruction(node.elements.length);
        
        break;
      };

      case "CallExpression": {
        let op;

        if(node.callee.type === 'MemberExpression') {
          this.walkNode(node.callee.object);
          this.walkNode(node.callee.property);
          op = opcodes.CALL_METHOD;
        } else {
          this.walkNode(node.callee);
          op = opcodes.CALL_FUNCTION;
        };

        const args = node.arguments.reverse();

        for(const arg of args) {
          this.walkNode(arg);
        };

        this.writeOp(op);
        this.writeInstruction(args.length);
        
        break;
      };

      case "MemberExpression": {
        this.walkNode(node.object);

        if(node.property.type === 'Identifier' && !node.computed) {
          this.walkNode(types.stringLiteral(node.property.name));
        } else {
          this.walkNode(node.property);
        };

        this.writeOp(opcodes.GET_PROPERTY);

        break;
      };
      
      case "Identifier": {
        if(this.currentScope.hasVariable(node.name)) {
          const definition = this.currentScope.getVariable(node.name);

          this.writeOp(opcodes.LOAD_FROM_SCOPE);
          this.writeInstruction(definition.scope.id);
          this.writeInstruction(definition.id);
        
          return;
        };
        
        if(this.currentScope.hasVariableFromRoot(node.name)) {
          const definition = this.currentScope.getVariableFromRoot(node.name);
          
          this.writeOp(opcodes.LOAD_FROM_SCOPE);
          this.writeInstruction(definition.scope.id);
          this.writeInstruction(definition.id);
          
          return;
        };

        if(this.globals.has(node.name)) {
          this.writeOp(opcodes.LOAD_FROM_GLOBAL);
          this.writeInstruction(node.name);

          return;
        };

        this.writeOp(opcodes.STACK_PUSH);
        this.writeInstruction(node.name);
        
        break;
      };

      case "VariableDeclaration": {
        for(const declarator of node.declarations) {
          this.walkNode(declarator);
        };
        
        break;
      };

      case "VariableDeclarator": {
        if(node.id.type !== 'Identifier') return;
        
        const scope = this.currentScope;

        if(node.init)
          this.walkNode(node.init)
        else
          this.writeInstruction(undefined);

        const definition = scope.defineVariable(node.id.name);

        this.writeOp(opcodes.STORE_VARIABLE);
        this.writeInstruction(scope.id);
        this.writeInstruction(definition.id);
        
        break;
      };

      case "BlockStatement": {
        this.enterNewScope();

        for(const statement of node.body) {
          this.walkNode(statement);
        };

        this.exitScope();
        
        break;
      };

      case "ExpressionStatement": {
        this.walkNode(node.expression);
        
        break;
      };

      case "EmptyStatement": {
        break;
      };

      default: {
        throw new Error("Unsupported node type: " + node.type);
      };
    };
  };

  public compile(source: string) {
    const tree = parseCode(source);

    this.globals = getGlobals(tree);

    for(const node of tree.program.body) {
      this.walkNode(node);
    };

    return this.program;
  };
};

export default Compiler;