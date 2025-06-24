const obfuscate = require("./dist").default;

obfuscate(`
  const onload = console.log.bind(console, 'Script loaded');

  const script = document.createElement('script');

  script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
  
  script.onload = onload;

  document.body.appendChild(script);
`).then(console.log);