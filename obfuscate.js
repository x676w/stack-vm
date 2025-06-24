const obfuscate = require("./dist").default;

obfuscate(`
  let name = 'John';

  console.log(name);

  name = 'Alex';

  console.log(name);
`).then(console.log);