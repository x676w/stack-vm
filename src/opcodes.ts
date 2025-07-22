import { random } from "./utils.js";

export interface IOperationCode {
  name: string;
  description: string;
  instruction: number;
};

const opInstructionsSet = new Set();

function generateUniqueOpInstruction() {
  const generation = random(0, 0xFF);

  if(opInstructionsSet.has(generation))
    return generateUniqueOpInstruction();
  else
    return opInstructionsSet.add(generation), generation;
};

class OperationCode implements IOperationCode {
  public name: string;
  public description: string;
  public instruction: number;
  
  constructor(name: string, description?: string, instruction?: number) {
    this.name = name;
    this.description = description ?? "none";
    this.instruction = instruction ?? generateUniqueOpInstruction();
  };
};

const STACK_PUSH                       = new OperationCode("STACK_PUSH");
const STACK_POP                        = new OperationCode("STACK_POP");

const BINARY_ADD                       = new OperationCode("BINARY_ADD");
const BINARY_SUB                       = new OperationCode("BINARY_SUB");
const BINARY_MUL                       = new OperationCode("BINARY_MUL");
const BINARY_DIV                       = new OperationCode("BINARY_DIV");
const BINARY_MOD                       = new OperationCode("BINARY_MOD");

const BINARY_LESS                      = new OperationCode("BINARY_LESS");
const BINARY_LESS_OR_EQUAL             = new OperationCode("BINARY_LESS_OR_EQUAL");
const BINARY_GREATER                   = new OperationCode("BINARY_GREATER");
const BINARY_GREATER_OR_EQUAL          = new OperationCode("BINARY_GREATER_OR_EQUAL");
const BINARY_EQUAL                     = new OperationCode("BINARY_EQUAL");
const BINARY_STRICT_EQUAL              = new OperationCode("BINARY_STRICT_EQUAL");
const BINARY_NOT_EQUAL                 = new OperationCode("BINARY_NOT_EQUAL");
const BINARY_STRICT_NOT_EQUAL          = new OperationCode("BINARY_STRICT_NOT_EQUAL");

const BINARY_BIT_SHIFT_LEFT            = new OperationCode("BINARY_BIT_SHIFT_LEFT");
const BINARY_BIT_SHIFT_RIGHT           = new OperationCode("BINARY_BIT_SHIFT_RIGHT");
const BINARY_BIT_SHIFT_RIGHT_UNSIGNED  = new OperationCode("BINARY_BIT_SHIFT_RIGHT_UNSIGNED");
const BINARY_BIT_XOR                   = new OperationCode("BINARY_BIT_XOR");
const BINARY_BIT_OR                    = new OperationCode("BINARY_BIT_OR");
const BINARY_BIT_AND                   = new OperationCode("BINARY_BIT_AND");

const UNARY_PLUS                       = new OperationCode("UNARY_PLUS");
const UNARY_MINUS                      = new OperationCode("UNARY_MINUS");
const UNARY_NOT                        = new OperationCode("UNARY_NOT");
const UNARY_BIT_NOT                    = new OperationCode("UNARY_BIT_NOT");

const STORE_VARIABLE                   = new OperationCode("STORE_VARIABLE");
const STORE_CONSTANT                   = new OperationCode("STORE_CONSTANT");
const LOAD_FROM_SCOPE                  = new OperationCode("LOAD_FROM_SCOPE");
const LOAD_FROM_GLOBAL                 = new OperationCode("LOAD_FROM_GLOBAL");
const ASSIGN_VARIABLE                  = new OperationCode("ASSIGN_VARIABLE");

const BUILD_ARRAY                      = new OperationCode("BUILD_ARRAY");
const BUILD_OBJECT                     = new OperationCode("BUILD_OBJECT");
const BUILD_FUNCTION                   = new OperationCode("BUILD_FUNCTION");

const GET_PROPERTY                     = new OperationCode("GET_PROPERTY");
const SET_PROPERTY                     = new OperationCode("SET_PROPERTY");

const CALL_FUNCTION                    = new OperationCode("CALL_FUNCTION");
const CALL_METHOD                      = new OperationCode("CALL_METHOD");

const JMP                              = new OperationCode("JMP");
const JMP_IF_TRUE                      = new OperationCode("JMP_IF_TRUE");
const JMP_IF_FALSE                     = new OperationCode("JMP_IF_FALSE");

export default {
  STACK_PUSH,
  STACK_POP,

  BINARY_ADD,
  BINARY_SUB,
  BINARY_MUL,
  BINARY_DIV,
  BINARY_MOD,

  BINARY_LESS,
  BINARY_LESS_OR_EQUAL,
  BINARY_GREATER,
  BINARY_GREATER_OR_EQUAL,
  BINARY_EQUAL,
  BINARY_STRICT_EQUAL,
  BINARY_NOT_EQUAL,
  BINARY_STRICT_NOT_EQUAL,

  BINARY_BIT_SHIFT_LEFT,
  BINARY_BIT_SHIFT_RIGHT,
  BINARY_BIT_SHIFT_RIGHT_UNSIGNED,
  BINARY_BIT_XOR,
  BINARY_BIT_OR,
  BINARY_BIT_AND,

  UNARY_PLUS,
  UNARY_MINUS,
  UNARY_NOT,
  UNARY_BIT_NOT,

  STORE_VARIABLE,
  STORE_CONSTANT,
  LOAD_FROM_SCOPE,
  LOAD_FROM_GLOBAL,
  ASSIGN_VARIABLE,

  BUILD_ARRAY,
  BUILD_OBJECT,
  BUILD_FUNCTION,

  GET_PROPERTY,
  SET_PROPERTY,

  CALL_FUNCTION,
  CALL_METHOD,

  JMP,
  JMP_IF_TRUE,
  JMP_IF_FALSE,
}