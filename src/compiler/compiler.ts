import opcodes from "../opcodes";
import { IOperationCode } from "../opcodes";
import { SVArrayExpression, SVBinaryExpression, SVVariableDefinition, SVIdentifier, SVLiteral, SVLogicalExpression, SVNode, SVScope, SVUnaryExpression, SVUnaryOperator, SVCallExpression, SVMemberExpression, SVAssignmentExpression } from "../parser/nodes";
import { TNodesRoot } from "../parser/parser";

class Compiler {
  private program     : number[];
  private scopes      : SVScope[];

  public usedOpcodes  : number[];

  constructor() {
    this.program     = [];
    this.usedOpcodes = [];
    this.scopes      = [new SVScope(0)];
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

  private getCurrentScope() {
    return this.scopes[this.scopes.length - 1];
  };

  private pushScope() {
    const parent = this.getCurrentScope();

    const newScope = new SVScope(
      parent.id, parent
    );

    this.scopes.push(newScope);
  };

  private popScope() {
    return this.scopes.length > 1 ? this.scopes.pop()! : this.scopes[this.scopes.length - 1];
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
          this.writeOp(opcodes.BINARY_BIT_OR);
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

      case "CallExpression": {
        const callee = (node as SVCallExpression).callee;
        const args = (node as SVCallExpression).args;

        for(const arg of args) {
          this.walkNode(arg);
        };

        if(callee.nodeType === 'MemberExpression') {
          this.writeOp(opcodes.CALL_METHOD);
          this.writeInstruction(args.length);
        } else {
          this.writeOp(opcodes.CALL_FUNCTION);
          this.writeInstruction(args.length);
        };
        
        break;
      };

      case "MemberExpression": {
        const expression = (node as SVMemberExpression);

        this.walkNode(expression.object);
        this.walkNode(expression.property);
        this.writeOp(opcodes.GET_PROPERTY);

        break;
      };
      
      case "AssignmentExpression": {
        /**
         * Currently supports only identifier assignemnts
         */
        const expression = (node as SVAssignmentExpression);

        if(!expression.isIdentifierAssignment)
          return;

        const left = expression.left as SVIdentifier;
        const right = expression.right;

        const scope = this.getCurrentScope();

        if(scope.hasVariableInParentRoot(left.name)) {
          const definition = scope.getVariableInParentRoot(left.name);

          this.walkNode(right);
          this.writeOp(opcodes.ASSIGN_VARIABLE);    
          this.writeInstruction(definition.scope.id);
          this.writeInstruction(definition.id);
        };
        
        break;
      };

      case "Identifier": {
        const identifier = (node as SVIdentifier);

        const scope = this.getCurrentScope();

        if(scope.hasVariable(identifier.name)) {
          const definition = scope.getVariable(identifier.name);

          this.writeOp(opcodes.LOAD_FROM_SCOPE);
          this.writeInstruction(definition.scope.id);
          this.writeInstruction(definition.id);
        
          return;
        };
        
        if(scope.hasVariableInParentRoot(identifier.name)) {
          const definition = scope.getVariableInParentRoot(identifier.name);
          
          this.writeOp(opcodes.LOAD_FROM_SCOPE);
          this.writeInstruction(definition.scope.id);
          this.writeInstruction(definition.id);
          
          return;
        };

        if(identifier.isGlobal) {
          this.writeOp(opcodes.LOAD_FROM_GLOBAL);
          this.writeInstruction(identifier.name);

          return;
        };

        this.writeOp(opcodes.STACK_PUSH);
        this.writeInstruction(identifier.name);
        
        break;
      };

      case "VariableDefinition": {
        const definition = node as SVVariableDefinition;

        const scope = this.getCurrentScope();

        for(const variable of definition.variables) {
          if(variable.value)
            this.walkNode(variable.value)
          else
            this.writeInstruction(undefined);

          const definition = scope.defineVariable(
            variable.name, variable.constant
          );

          this.writeOp(
            variable.constant ? opcodes.STORE_CONSTANT : opcodes.STORE_VARIABLE
          );

          this.writeInstruction(scope.id);
          this.writeInstruction(definition.id);
        };
        
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