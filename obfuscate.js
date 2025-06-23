const obfuscate = require("./dist").default;

obfuscate(`
  const number1 = 100;
  const number2 = 200;

  console.log(typeof number1 === 'number');
  console.log(typeof number2 === 'number');

  console.log(number1 + number2);
  console.log(number1 - number2);
  console.log(number1 * number2);
  console.log(number1 / number2);
  console.log(number1 % number2);
  console.log(number1 < number2);
  console.log(number1 <= number2);
  console.log(number1 > number2);
  console.log(number1 >= number2);
  console.log(number1 == number2);
  console.log(number1 === number2);
  console.log(number1 != number2);
  console.log(number1 !== number2);
  console.log(number1 << number2);
  console.log(number1 >> number2);
  console.log(number1 >>> number2);
  console.log(number1 ^ number2);
  console.log(number1 & number2);
  console.log(number1 | number2);
`).then(console.log);