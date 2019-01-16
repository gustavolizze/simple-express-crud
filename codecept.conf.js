exports.config = {
  tests: './tests/acceptance/setup.js',
  output: './reports',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3000',
      waitForNavigation: [ "domcontentloaded", "networkidle0" ],
      show: true
    }
  },
  bootstrap: null,
  mocha: {},
  name: 'simple-express-crud',
  translation: 'pt-BR'
}