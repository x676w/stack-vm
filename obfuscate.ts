import obfuscate from "./src/index.js";

obfuscate(`
  console.log('Hello, World!');
`).then((interpreter) => {
  console.log(interpreter);
});