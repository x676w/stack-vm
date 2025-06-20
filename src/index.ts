import Compiler from "./compiler/compiler";
import Parser from "./parser/parser";

function obfuscate(code: string) {
  const parser   = new Parser(),
        compiler = new Compiler();
  
  const nodesRoot = parser.parse(code);

  const program = compiler.compile(nodesRoot);

  return program;
};

export default obfuscate;