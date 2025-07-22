import { assert } from "../utils.js";

export class ScopeDefinition {
  public id: number;
  public scope: ScopeImitator;
  
  constructor(id: number, scope: ScopeImitator) {
    this.id = id;
    this.scope = scope;
  };
};

export class ScopeImitator {
  public id: number;
  public parent: ScopeImitator | null;
  public variables: Map<string, ScopeDefinition>;
  
  constructor(id: number, parent?: ScopeImitator) {
    this.id = id;
    this.parent = parent ?? null;
    this.variables = new Map();
  };

  public hasVariable(name: string): boolean {
    return this.variables.has(name);
  };

  public hasVariableFromRoot(name: string) {
    return this.variables.has(name) || !!(this.parent && this.parent.hasVariable(name));;
  };

  public getVariable(name: string) {
    const definition = this.variables.get(name);

    assert(definition, name + " is not defined.");

    return definition!;
  };

  public getVariableFromRoot(name: string): ScopeDefinition {
    if(this.hasVariable(name))
      return this.getVariable(name);
    else if(this.parent)
      return this.parent.getVariableFromRoot(name);
    else
      throw new Error(name + " is not defined.");
  };

  public defineVariable(name: string) {
    const isDefined = this.variables.has(name);

    assert(
      !isDefined,
      name + " is already defined."
    );

    const definition = new ScopeDefinition(
      this.variables.size, this
    );

    this.variables.set(name, definition);

    return definition;
  };
};