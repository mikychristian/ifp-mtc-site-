const serverless = require('serverless-http');
const app = require('../server');

module.exports = serverless(app, {
  binary: ['image/*', 'font/*', 'application/octet-stream']
});
