const obfuscate = require("./dist").default;

obfuscate(`
  var name = 'John';

  console.log(name);

  var name = 'Alex';

  console.log(name);
`).then(console.log);