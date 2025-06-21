const obfuscate = require("./dist").default;

console.log(obfuscate(`
  let string = "Hello, World!";

  let string2 = string;
`));