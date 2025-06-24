const obfuscate = require("./dist").default;

obfuscate(`
  const className = 'my-button';

  const button = document.createElement('button');

  button.classList.add(className);

  document.body.appendChild(button);

  console.log('Appended button with class:', className);
`).then(console.log);