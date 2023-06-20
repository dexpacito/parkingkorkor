const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://datamall2.mytransport.sg',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/ltaodataservice/CarParkAvailabilityv2'
      }
    })
  );
};
