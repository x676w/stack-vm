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

Edit `obfuscate.ts`
```ts
import obfuscate from "./src/index.js";

obfuscate(`
  console.log('Hello, World!');
`).then((interpreter) => {
  console.log(interpreter);
});
```

```bash
npm start
```

Output
```js
!function(n){let r=0;const o=[80,"console",69,"log",69,"Hello, World!",74,1],e=[];function c(){return o[r++]}function t(){if(!(r>=o.length))return function(){switch(c()){case 74:for(var r=c(),o=new Array(r),t=0;t<r;t++)o[t]=e.pop();var a=e.pop(),f=e.pop();e.push(f[a].apply(f,o));break;case 80:e.push(n[c()]);break;case 69:e.push(c())}}(),!0}for(;t(););}(this);
```

# Supported Features
- Arithmetic	          ✅
- Unary Expressions	    ✅
- Logical Expressions	  ❌​
- Call Expressions	    ✅
- Arrays	              ✅
- Objects	              ❌​
- Variables	            ✅
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