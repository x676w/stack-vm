import { assert } from "../utils";

export class SVNode {
  public type: string;

  constructor(type: string) {
    this.type = type;
  };
};

export class SVLiteral extends SVNode {
  public value: any;

  constructor(type: "string" | "number" | "boolean", value: any) {
    super(type);

    switch(type) {
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
  };
};