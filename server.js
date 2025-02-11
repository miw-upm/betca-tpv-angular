const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Ruta al directorio de Angular compilado
const PATH_PROJECT = path.join(__dirname, 'dist', 'betca-tpv-angular','browser');

// Servir archivos estáticos desde la carpeta de Angular
app.use(express.static(PATH_PROJECT));

// Manejar todas las rutas con Angular (evita errores 404 en rutas internas)
app.get('*', (req, res) => {
  res.sendFile(path.join(PATH_PROJECT, 'index.html'));
});

// Iniciar el servidor en el puerto 8080 o el especificado en variables de entorno
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});
