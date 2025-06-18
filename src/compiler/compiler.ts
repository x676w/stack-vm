import { TNodesRoot } from "../parser/parser";

class Compiler {
  private buffer:  number[];
  private strings: string[];

  constructor() {
    this.buffer   = [];
    this.strings  = [];
  };

  public compile(nodes: TNodesRoot) {
    
  };
};

export default Compiler;