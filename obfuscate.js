const obfuscate = require("./dist").default;
const confuser = require("js-confuser");

obfuscate(`
  const onload = console.log.bind(console, 'Script loaded');

  const script = document.createElement('script');

  script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
  
  script.onload = onload;

  document.body.appendChild(script);
`).then(async (interpreter) => {
  interpreter = (await confuser.obfuscate(interpreter, {
    target: 'browser',
    identifierGenerator: 'mangled',
    renameVariables: true,
    renameGlobals: true,
    movedDeclarations: true,

    stringCompression: false,
    stringConcealing: true,
    stringEncoding: false,
    stringSplitting: false,

    calculator: true,
    objectExtraction: true,
    globalConcealing: false,
    shuffle: false,
    duplicateLiteralsRemoval: 0.2,

    controlFlowFlattening: false,
    dispatcher: 0.2,
    opaquePredicates: 0.1,
    deadCode: false,

    flatten: false,
    rgf: false,
    pack: false,

    compact: true,
    minify: true
  })).code;

  console.log(interpreter);
});