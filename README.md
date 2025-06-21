# StackVM

[![License](https://img.shields.io/badge/license-UNLICENSED-lightgray.svg)]()

JavaScript code obfuscator based on stack virtual machine virtualization. Transforms your JavaScript code into a virtualized stack-based representation, making it harder to understand while maintaining functionality.

### Features

- Converts JavaScript code to stack-based virtual machine instructions
- Preserves original program functionality
- Lightweight obfuscation solution
- Focus on core JavaScript features

### Installation
```bash
git clone https://github.com/x676w/StackVM

cd StackVM

npm install
```

Edit `obfuscate.js`
```js
const obfuscate = require("./dist").default;

const program = obfuscate(`
  const string = "Hello, World!";

  const string2 = string;
`);

console.log(program);
```

### Supported Features
- Arithmetic	          ✅
- Variables	            ✅
- Logical Expressions	  ✅
- Unary Expressions	    ✅
- Arrays	              ✅
- Objects	              ❌​
- Functions	            ❌​
- Loops	                ❌​
- Conditionals	        ❌​

### How It Works
StackVM transforms your JavaScript code into a series of stack operations executed by a virtual machine. The original code structure is replaced with:

A stack-based instruction set

A virtual machine interpreter

Obfuscated data storage

This approach makes reverse engineering more difficult while keeping the runtime behavior identical.

### Limitations
Currently only supports a subset of JavaScript features

Not a strong obfuscation solution for security-critical applications

May impact performance for complex operations

### License
UNLICENSED