const obfuscate = require("./dist").default;
const confuser = require("js-confuser");

obfuscate(`
  const array = [];

  array.push(1);
  array.push(2);
  array.push(3);
  array.push(4);
  array.push(5);
  
  console.log(array);

  array[0] = 10;

  console.log(array, array.length);
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