import opcodes from "../opcodes";
import { IOperationCode } from "../opcodes";
import { SVArrayExpression, SVBinaryExpression, SVLiteral, SVLogicalExpression, SVNode, SVUnaryExpression, SVUnaryOperator } from "../parser/nodes";
import { TNodesRoot } from "../parser/parser";

class Compiler {
  private program     :  number[];
  private usedOpcodes : IOperationCode[];

  constructor() {
    this.program     = [];
    this.usedOpcodes = [];
  };

  private writeInstruction(instruction: any) {
    this.program.push(instruction);
  };

  private writeOp(op: IOperationCode) {
    this.writeInstruction(op.instruction);
  };

  private walkNode(node: SVNode) {
    switch(node.nodeType) {
      case "Literal": {
        const arg = (node as SVLiteral).value;

        this.writeOp(opcodes.STACK_PUSH);
        this.writeInstruction(arg);

        break;
      };

      case "BinaryExpression": {
        const right = (node as SVBinaryExpression).right;
        const left = (node as SVBinaryExpression).left;
        const operator = (node as SVBinaryExpression).operator;
        
        this.walkNode(right);
        this.walkNode(left);

        if(operator === "+")
          this.writeOp(opcodes.BINARY_ADD);
        else if(operator === "-")
          this.writeOp(opcodes.BINARY_SUB);
        else if(operator === "*")
          this.writeOp(opcodes.BINARY_MUL);
        else if(operator === "/")
          this.writeOp(opcodes.BINARY_DIV);
        else if(operator === "%")
          this.writeOp(opcodes.BINARY_MOD);
        else if(operator === "<")
          this.writeOp(opcodes.BINARY_LESS);
        else if(operator === "<=")
          this.writeOp(opcodes.BINARY_LESS_OR_EQUAL);
        else if(operator === ">")
          this.writeOp(opcodes.BINARY_GREATER);
        else if(operator === ">=")
          this.writeOp(opcodes.BINARY_GREATER_OR_EQUAL);
        else if(operator === "==")
          this.writeOp(opcodes.BINARY_EQUAL);
        else if(operator === "===")
          this.writeOp(opcodes.BINARY_STRICT_EQUAL);
        else if(operator === "!=")
          this.writeOp(opcodes.BINARY_NOT_EQUAL);
        else if(operator === "!==")
          this.writeOp(opcodes.BINARY_STRICT_NOT_EQUAL);
        else if(operator === "<<")
          this.writeOp(opcodes.BINARY_BIT_SHIFT_LEFT);
        else if(operator === ">>")
          this.writeOp(opcodes.BINARY_BIT_SHIFT_RIGHT);
        else if(operator === ">>>")
          this.writeOp(opcodes.BINARY_BIT_SHIFT_RIGHT_UNSIGNED);
        else if(operator === "^")
          this.writeOp(opcodes.BINARY_BIT_XOR);
        else if(operator === "|")
          this.writeOp(opcodes.BINARY_BIT_XOR);
        else if(operator === "&")
          this.writeOp(opcodes.BINARY_BIT_AND);
        
        break;
      };

      case "LogicalExpression": {
        const right = (node as SVLogicalExpression).right;
        const left = (node as SVLogicalExpression).left;
        const operator = (node as SVLogicalExpression).operator;

        this.walkNode(right);
        this.walkNode(left);
        
        if(operator === "||")
          this.writeOp(opcodes.LOGICAL_OR);
        else if(operator === "&&")
          this.writeOp(opcodes.LOGICAL_AND);

        break;
      };

      case "UnaryExpression": {
        const arg = (node as SVUnaryExpression).arg;
        const operator = (node as SVUnaryExpression).operator;

        this.walkNode(arg);
        
        if(operator === "+")
          this.writeOp(opcodes.UNARY_PLUS);
        else if(operator === "-")
          this.writeOp(opcodes.UNARY_MINUS);
        else if(operator === "!")
          this.writeOp(opcodes.UNARY_NOT);
        else if(operator === "~")
          this.writeOp(opcodes.UNARY_BIT_NOT);
        else if(operator === "typeof")
          this.writeOp(opcodes.UNARY_TYPEOF);
        
        break;
      };

      case "ArrayExpression": {
        const elements = (node as SVArrayExpression).elements;

        for(const element of elements) {
          this.walkNode(element);
        };

        this.writeOp(opcodes.BUILD_ARRAY);
        this.writeInstruction(elements.length);
        
        break;
      };
    };
  };

  public compile(nodeRoot: TNodesRoot) {
    for(const node of nodeRoot) {
      this.walkNode(node);
    };

    return this.program;
  };
};

export default Compiler;