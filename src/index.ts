import fs from "fs";
import path from "path";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import Compiler from "./compiler/compiler";
import Parser from "./parser/parser";
import opcodes from "./opcodes";
import { minify } from "terser";
import { parseCode, shuffleArray } from "./utils";
import { SwitchCase, switchStatement } from "@babel/types";

const interpreterPath = path.resolve(
  path.join("./", "interpreter.js")
);

async function obfuscate(code: string): Promise<string> {
  let interpreter = fs.readFileSync(interpreterPath, "utf8");

  const parser   = new Parser(),
        compiler = new Compiler();
  
  const nodesRoot = parser.parse(code);

  const program = compiler.compile(nodesRoot);

  interpreter = interpreter.replace(
    "__PROGRAM__",
    JSON.stringify(program)
  );

  for(const key in opcodes) {
    const opcode = opcodes[key as keyof typeof opcodes];

    interpreter = interpreter.replace(
      "__" + key + "__",
      opcode.instruction.toString()
    );
  };

  const intepreterAST = parseCode(interpreter);

  traverse(intepreterAST, {
    SwitchStatement: (path) => {
      const isVmCases = path.node.cases.every((_case) => {
        return _case.test?.type === 'NumericLiteral'
          && _case.test.value >= 0
          && _case.test.value <= 255;
      });

      if(!isVmCases)
        return;

      const casesToKeep = [] as SwitchCase[];

      for(const _case of path.node.cases) {
        if(_case.test?.type !== 'NumericLiteral')
          continue;

        if(!compiler.usedOpcodes.includes(_case.test.value))
          continue;

        casesToKeep.push(_case);
      };

      path.replaceWith(
        switchStatement(
          path.node.discriminant,
          casesToKeep
        )
      );

      path.skip();

      shuffleArray(path.node.cases);
    }
  });

  interpreter = generate(intepreterAST).code;

  interpreter = (await minify(interpreter, {
    module: true,
    
    compress: true,

    mangle: {
      properties: true,
    }
  })).code!;
  
  return interpreter;
};

export default obfuscate;