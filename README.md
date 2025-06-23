# StackVM

JavaScript code obfuscator based on stack virtual machine virtualization. Transforms your JavaScript code into a virtualized stack-based representation, making it harder to understand while maintaining functionality.

# Features

- Converts JavaScript code to stack-based virtual machine instructions
- Preserves original program functionality
- Lightweight obfuscation solution
- Focus on core JavaScript features

# Installation
```bash
git clone https://github.com/x676w/StackVM

cd StackVM

npm install
```

Edit `obfuscate.js`
```js
const obfuscate = require("./dist").default;

obfuscate(`
  console.log('Hello, World!');
`).then((output) => {
  console.log(output);
});
```

```bash
npm start
```

```js
/* output */
!function(){let n=0;const e=[102,"console",9,"log",9,"Hello, World!",95,1],o=[];function r(){return e[n++]}function t(){if(!(n>=e.length))return function(){switch(r()){case 9:o.push(r());break;case 102:o.push("undefined"!=typeof window?window[r()]:"undefined"!=typeof global?global[r()]:new Function("return this")()[r()]);break;case 95:for(var n=r(),e=new Array(n),t=0;t<n;t++)e[t]=o.pop();var i=o.pop(),c=o.pop();o.push(c[i].apply(c,e))}}(),!0}for(;t(););}();
```

# Supported Features
- Arithmetic	          ✅
- Variables	            ✅
- Logical Expressions	  ✅
- Unary Expressions	    ✅
- Call Expressions	    ✅
- Arrays	              ✅
- Objects	              ❌​
- Functions	            ❌​
- Loops	                ❌​
- Conditionals	        ❌​

# How It Works
StackVM transforms your JavaScript code into a series of stack operations executed by a virtual machine. The original code structure is replaced with:

A stack-based instruction set

A virtual machine interpreter

Obfuscated data storage

This approach makes reverse engineering more difficult while keeping the runtime behavior identical.

# Limitations
Currently only supports a subset of JavaScript features

Not a strong obfuscation solution for security-critical applications

May impact performance for complex operations

# License
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgray.svg)]()