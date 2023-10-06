const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8008', // Assuming your microservice is running on port 8008
      changeOrigin: true,
    })
  );
};
