import obfuscate from "./src/index.js";

obfuscate(`
  console.log(123);
`).then((interpreter) => {
  console.log(interpreter);
});