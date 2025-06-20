const obfuscate = require("./dist").default;

obfuscate(`
  [1,2,3,4,5,6,7,8,9,10,"Hello, World!"]
`);