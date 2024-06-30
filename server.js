const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configure le middleware proxy
app.use('/dialogflow', createProxyMiddleware({
  target: 'https://dialogflow.cloud.google.com',
  changeOrigin: true,
  pathRewrite: {
    '^/dialogflow': '/v1/integrations/messenger/webhook/882d92d7-b3d3-47a9-a973-b0b11c068ee5/sessions',
  },
  onProxyReq: (proxyReq, req, res) => {
    // Ajouter des en-têtes ici si nécessaire
    proxyReq.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

// Démarre le serveur
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
