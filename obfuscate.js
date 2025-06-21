const obfuscate = require("./dist").default;

console.log(obfuscate(`
  const string = "Hello, World!";

  const string2 = string;
`));