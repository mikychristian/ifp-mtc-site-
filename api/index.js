const serverless = require('serverless-http');
const app = require('../server');

module.exports = serverless(app);

// Vercel will use this file as a serverless function entrypoint.
