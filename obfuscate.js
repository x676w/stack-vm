const obfuscate = require("./dist").default;

const program = obfuscate(`
  alert(123);
`);

console.log(program);