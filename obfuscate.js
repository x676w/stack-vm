const obfuscate = require("./dist").default;

const program = obfuscate(`
  const string = "Hello, World!";

  const string2 = string;
`);

console.log(program);